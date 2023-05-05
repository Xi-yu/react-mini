import { NoFlags } from "./ReactFiberFlags";
import { NoLanes } from "./ReactFiberLane";
import { ConcurrentRoot } from "./ReactRootTags";
import { ConcurrentMode } from "./ReactTypeOfMode";
import { HostRoot } from "./ReactWorkTags";

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

  return workInProgress;
}
