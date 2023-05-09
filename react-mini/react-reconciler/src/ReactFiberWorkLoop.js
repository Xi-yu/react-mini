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
  getHighestPriorityLane,
  getNextLanes,
  markRootUpdated,
  mergeLanes,
} from "./ReactFiberLane";
import { ConcurrentMode, NoMode } from "./ReactTypeOfMode";
import { beginWork } from "./ReactFiberBeginWork";
import { finishQueueingConcurrentUpdates } from "./ReactFiberConcurrentUpdates";

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
  markRootUpdated(root, lane);
  ensureRootIsScheduled(root, eventTime);
}

function ensureRootIsScheduled(root, currentTime) {
  const nextLanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes
  );
  const newCallbackPriority = getHighestPriorityLane(nextLanes);
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
    // todo: workInProgressRootRenderLanes是干嘛的?
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
  workInProgressRootRenderLanes = subtreeRenderLanes = lanes;

  finishQueueingConcurrentUpdates();

  return rootWorkInProgress;
}

function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYieldToHost()) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork) {
  // todo - Fiber树构造
  const current = unitOfWork.alternate;
  let next = beginWork(current, unitOfWork, subtreeRenderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) {
    // todo
  } else {
    // workInProgress = next;
  }
  workInProgress = null;
}

export function markSkippedUpdateLanes(lane) {
  workInProgressRootSkippedLanes = mergeLanes(
    lane,
    workInProgressRootSkippedLanes
  );
}
