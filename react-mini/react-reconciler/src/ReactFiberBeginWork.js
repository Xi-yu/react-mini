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
  // current - 已经存在的Fiber节点
  // workInProgress - 正在构造的Fiber节点
  if (current !== null) {
    // 对比更新时或者根Fiber节点时
    const oldProps = current.memoizedProps;
    const newProps = workInProgress.pendingProps;
    if (oldProps !== newProps) {
      didReceiveUpdate = true;
    } else {
      // true
      const hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(
        current,
        renderLanes
      );
      if (
        !hasScheduledUpdateOrContext &&
        (workInProgress.flags & DidCapture) === NoFlags
      ) {
        didReceiveUpdate = false;
        // todo
        return attemptEarlyBailoutIfNoScheduledUpdate(
          current,
          workInProgress,
          renderLanes
        );
      }
      didReceiveUpdate = false;
    }
  } else {
    // 非根Fiber节点初次渲染时
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
  // pushHostRootContext(workInProgress);
  const nextProps = workInProgress.pendingProps;
  const prevState = workInProgress.memoizedState;
  const prevChildren = prevState.element;
  cloneUpdateQueue(current, workInProgress);
  processUpdateQueue(workInProgress, nextProps, null, renderLanes); // 将 workInProgress.updateQueue.shared.pending.next,payload.element 赋值给 workInProgress.memoizedState.element
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
    // todo - 非根Fiber节点初次渲染
  } else {
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    );
  }
}

function checkScheduledUpdateOrContext(current, renderLanes) {
  const updateLanes = current.lanes;
  if (includesSomeLane(updateLanes, renderLanes)) {
    return true;
  }
  if (enableLazyContextPropagation) {
    const dependencies = current.dependencies;
    if (dependencies !== null && checkIfContextChanged(dependencies)) {
      return true;
    }
  }
  return false;
}
