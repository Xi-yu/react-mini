import { reconcileChildFibers } from "./ReactChildFiber";
import {
  cloneUpdateQueue,
  processUpdateQueue,
} from "./ReactFiberClassUpdateQueue";
import { pushHostContainer } from "./ReactFiberHostContext";
import { NoLanes, includesSomeLane } from "./ReactFiberLane";
import { HostRoot } from "./ReactWorkTags";

let didReceiveUpdate = false;

export function beginWork(current, workInProgress, renderLanes) {
  if (current !== null) {
    // 对比更新或者根Fiber节点
    const oldProps = current.memoizedProps;
    const newProps = workInProgress.pendingProps;
    if (oldProps !== newProps) {
      didReceiveUpdate = true;
    } else {
      didReceiveUpdate = false;
      // todo: return attemptEarlyBailoutIfNoScheduledUpdate
    }
  } else {
    // 初次渲染
    didReceiveUpdate = false;
  }
  // 清空正在构造的Fiber.lanes
  workInProgress.lanes = NoLanes;
  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes);
  }
}

function pushHostRootContext(workInProgress) {
  // FiberRoot
  const root = workInProgress.stateNode;
  if (root.pendingContext) {
    // todo
  } else if (root.context) {
    // todo
  }
  pushHostContainer(workInProgress, root.containerInfo);
}

function updateHostRoot(current, workInProgress, renderLanes) {
  pushHostRootContext(workInProgress);
  const nextProps = workInProgress.pendingProps;
  const prevState = workInProgress.memoizedState;
  const prevChildren = prevState.element;
  cloneUpdateQueue(current, workInProgress);
  processUpdateQueue(workInProgress, nextProps, null, renderLanes);
  // processUpdateQueue函数可能会改变workInProgress.memoizedState
  const nextState = workInProgress.memoizedState;
  const root = workInProgress.stateNode;
  const nextChildren = nextState.element;
  if (nextChildren === prevChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  // 调和算法
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  if (current !== null) {
    workInProgress.dependencies = current.dependencies;
  }
  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    return null;
  }
  // todo cloneChildFibers
}

export function reconcileChildren(
  current,
  workInProgress,
  nextChildren,
  renderLanes
) {
  if (current === null) {
  } else {
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    );
  }
}
