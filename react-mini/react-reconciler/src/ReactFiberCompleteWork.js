import {
  appendInitialChild,
  createInstance,
  finalizeInitialChildren,
} from "../../react-dom/src/ReactDOMHostConfig";
import { getHostContext, getRootHostContainer } from "./ReactFiberHostContext";
import { HostComponent, HostPortal, HostText } from "./ReactWorkTags";

export function completeWork(current, workInProgress, renderLanes) {
  const newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case HostComponent:
      const rootContainerInstance = getRootHostContainer();
      const type = workInProgress.type;
      if (current !== null && workInProgress.stateNode !== null) {
        // todo
      } else {
        if (!newProps) {
          // todo
        }
        const currentHostContext = getHostContext();
        const instance = createInstance(
          type,
          newProps,
          rootContainerInstance,
          currentHostContext,
          workInProgress
        );
        appendAllChildren(instance, workInProgress, false, false);
        workInProgress.stateNode = instance;
        if (
          finalizeInitialChildren(
            instance,
            type,
            newProps,
            rootContainerInstance,
            currentHostContext
          )
        ) {
          markUpdate(workInProgress);
        }
        if (workInProgress.ref !== null) {
          // todo
          // markRef(workInProgress);
        }
      }
      bubbleProperties(workInProgress);
      return null;
  }
}

function appendAllChildren(
  parent,
  workInProgress,
  needsVisibilityToggle,
  isHidden
) {
  let node = workInProgress.child;
  while (node !== null) {
    if (node.tag === HostComponent || node.tag === HostText) {
      appendInitialChild(parent, node.stateNode);
    } else if (node.tag === HostPortal) {
      // todo
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
