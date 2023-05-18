import { createInstance } from "./ReactDOMHostConfig";
import { getHostContext, getRootHostContainer } from "./ReactFiberHostContext";
import { HostComponent } from "./ReactWorkTags";

export function completeWork(current, workInProgress, renderLanes) {
  debugger;
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
      }
  }
}

function appendAllChildren(
  parent,
  workInProgress,
  needsVisibilityToggle,
  isHidden
) {}
