import {
  getCurrentTime as now,
  shouldYieldToHost,
  unstable_IdlePriority,
  unstable_ImmediatePriority,
  unstable_NormalPriority,
  unstable_UserBlockingPriority,
  unstable_scheduleCallback,
} from "../../scheduler";
import {
  ContinuousEventPriority,
  DefaultEventPriority,
  DiscreteEventPriority,
  IdleEventPriority,
  getCurrentUpdatePriority,
  lanesToEventPriority,
} from "./ReactEventPriorities";
import { createWorkInProgress } from "./ReactFiber";
import { getCurrentEventPriority } from "./ReactDOMHostConfig";
import {
  NoLane,
  NoLanes,
  NoTimestamp,
  SyncLane,
  getHighestPriorityLane,
  getNextLanes,
  markRootUpdated,
  mergeLanes,
} from "./ReactFiberLane";
import { ConcurrentMode, NoMode } from "./ReactTypeOfMode";
import { beginWork } from "./ReactFiberBeginWork";
import { finishQueueingConcurrentUpdates } from "./ReactFiberConcurrentUpdates";
import { Incomplete, NoFlags } from "./ReactFiberFlags";
import { completeWork } from "./ReactFiberCompleteWork";

export const NoContext = 0b000;

let currentEventTime = NoTimestamp;
// FiberRoot
let workInProgressRoot = null;
// 正在构造的Fiber
let workInProgress = null;
let workInProgressRootRenderLanes = NoLanes;
let workInProgressRootSkippedLanes = NoLanes;
// 渲染阶段上下文
let executionContext = NoContext;
export let subtreeRenderLanes = NoLanes;

export function requestUpdateLane(fiber) {
  const mode = fiber.mode;
  if ((mode & ConcurrentMode) === NoMode) {
    // concurrent模式下不会进入
    return SyncLane;
  }
  const updateLane = getCurrentUpdatePriority();
  if (updateLane !== NoLane) {
    return updateLane;
  }
  const eventLane = getCurrentEventPriority();
  return eventLane;
}

export function scheduleUpdateOnFiber(root, fiber, lane, eventTime) {
  markRootUpdated(root, lane, eventTime);
  ensureRootIsScheduled(root, eventTime);
}

function ensureRootIsScheduled(root, currentTime) {
  const nextLanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes
  );
  const newCallbackPriority = getHighestPriorityLane(nextLanes);
  const existingCallbackNode = root.callbackNode;
  if (existingCallbackNode !== null) {
    // todo
  }
  // 注册一个调度任务
  let newCallbackNode;
  let schedulerPriorityLevel;
  switch (lanesToEventPriority(nextLanes)) {
    case DiscreteEventPriority:
      schedulerPriorityLevel = unstable_ImmediatePriority;
      break;
    case ContinuousEventPriority:
      schedulerPriorityLevel = unstable_UserBlockingPriority;
      break;
    case DefaultEventPriority:
      schedulerPriorityLevel = unstable_NormalPriority;
      break;
    case IdleEventPriority:
      schedulerPriorityLevel = unstable_IdlePriority;
      break;
    default:
      schedulerPriorityLevel = unstable_NormalPriority;
      break;
  }
  newCallbackNode = unstable_scheduleCallback(
    schedulerPriorityLevel,
    performConcurrentWorkOnRoot.bind(null, root)
  );

  root.callbackPriority = newCallbackPriority;
  root.callbackNode = newCallbackNode;
}

export function requestEventTime() {
  if (currentEventTime !== NoTimestamp) {
    return currentEventTime;
  }
  currentEventTime = now();
  return currentEventTime;
}

// 这是concurrent模式下, 所有task的入口(构造Fiber树)
function performConcurrentWorkOnRoot(root, didTimeout) {
  currentEventTime = NoTimestamp;
  let lanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes
  );
  // concurrent模式都是走这个函数, legacy模式走renderRootSync函数
  renderRootConcurrent(root, lanes);
  // 检查是否有新的调度任务
  // ensureRootIsScheduled(root, now());
}

function renderRootConcurrent(root, lanes) {
  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
    // 如果是初次渲染, workInProgressRoot=null
    // todo: workInProgressRootRenderLanes 是干嘛的?
    prepareFreshStack(root, lanes);
  }
  do {
    workLoopConcurrent();
    break;
  } while (true);
}

// 刷新帧栈
function prepareFreshStack(root, lanes) {
  root.finishedWork = null;
  root.finishedLanes = NoLanes;

  if (workInProgress !== null) {
    // todo: 对比更新时的逻辑, 初次渲染不进入
  }

  workInProgressRoot = root;
  const rootWorkInProgress = createWorkInProgress(root.current, null);
  workInProgress = rootWorkInProgress;
  // root.current.alternate === workInProgress
  // workInProgress.alternate === root.current

  workInProgressRootRenderLanes = subtreeRenderLanes = lanes;

  // 双缓冲技术: workInProgress.updateQueue === root.current.updateQueue
  // 将 updateQueue.shared.interleaved 接到 updateQueue.shared.pending
  finishQueueingConcurrentUpdates();

  return rootWorkInProgress;
}

function workLoopConcurrent() {
  // todo：还没有实现可中端渲染，所以先不判断shouldYieldToHost
  // while (workInProgress !== null && !shouldYieldToHost()) {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork) {
  // unitOfWork - 正在构造的Fiber节点
  const current = unitOfWork.alternate; // 已经存在的Fiber节点
  let next = beginWork(current, unitOfWork, subtreeRenderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) {
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}

function completeUnitOfWork(unitOfWork) {
  let completedWork = unitOfWork;
  do {
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;
    if ((completedWork.flags & Incomplete) === NoFlags) {
      const next = completeWork(current, completedWork, subtreeRenderLanes);
      if (next !== null) {
        workInProgress = next;
        return;
      }
    } else {
      // todo
    }
    const siblingFiber = completedWork.sibling;
    if (siblingFiber !== null) {
      workInProgress = siblingFiber;
      return;
    }
    completedWork = returnFiber;
    workInProgress = completedWork;
  } while (completedWork !== null);
}

export function markSkippedUpdateLanes(lane) {
  workInProgressRootSkippedLanes = mergeLanes(
    lane,
    workInProgressRootSkippedLanes
  );
}
