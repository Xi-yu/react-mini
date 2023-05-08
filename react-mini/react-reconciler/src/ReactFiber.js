import { NoFlags } from "./ReactFiberFlags";
import { NoLanes } from "./ReactFiberLane";
import { ConcurrentRoot } from "./ReactRootTags";
import { ConcurrentMode } from "./ReactTypeOfMode";
import {
  HostComponent,
  HostRoot,
  IndeterminateComponent,
} from "./ReactWorkTags";

export function createHostRootFiber(
  tag,
  isStrictMode,
  concurrentUpdatesByDefaultOverride
) {
  let mode;
  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode;
  }
  return createFiber(HostRoot, null, null, mode);
}

export function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}

function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
}

// 创建Fiber.alternate(双缓冲技术)
export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  if (workInProgress === null) {
    // 初次渲染
    workInProgress = createFiber(
      current.tag,
      current.pendingProps,
      current.key,
      current.mode
    );
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    // todo: 对比更新
  }
  // todo: workInProgress.flags = current.flags;
  workInProgress.lanes = current.lanes;
  workInProgress.childLanes = current.childLanes;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;

  return workInProgress;
}

export function createFiberFromElement(element, mode, lanes) {
  let owner = null;
  const type = element.type;
  const key = element.key;
  const pendingProps = element.props;
  const fiber = createFiberFromTypeAndProps(
    type,
    key,
    pendingProps,
    owner,
    mode,
    lanes
  );
  return fiber;
}

export function createFiberFromTypeAndProps(
  type,
  key,
  pendingProps,
  owner,
  mode,
  lanes
) {
  let fiberTag = IndeterminateComponent;
  let resolvedType = type;
  if (typeof type === "function") {
    // todo
  } else if (typeof type === "string") {
    fiberTag = HostComponent;
  } else {
    // todo
  }
  const fiber = createFiber(fiberTag, pendingProps, key, mode);
  fiber.elementType = type;
  fiber.type = resolvedType;
  fiber.lanes = lanes;
  return fiber;
}
