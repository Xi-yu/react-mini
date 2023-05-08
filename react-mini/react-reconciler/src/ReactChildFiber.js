import { REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE } from "../../shared";
import { createFiberFromElement } from "./ReactFiber";

function ChildReconciler(shouldTrackSideEffects) {
  function placeSingleChild() {}

  function reconcileSingleElement(
    returnFiber,
    currentFirstChild,
    element,
    lanes
  ) {
    console.log(element);
    console.log(returnFiber);
    console.log(lanes);
    const key = element.key;
    let child = currentFirstChild;
    while (child !== null) {
      //todo
    }

    if (element.type === REACT_FRAGMENT_TYPE) {
      // todo
    } else {
      const created = createFiberFromElement(element, returnFiber.mode, lanes);
    }
  }

  function reconcileChildFibers(
    returnFiber,
    currentFirstChild,
    newChild,
    lanes
  ) {
    const isUnkeyedTopLevelFragment =
      typeof newChild === "object" &&
      newChild !== null &&
      newChild.type === REACT_FRAGMENT_TYPE &&
      newChild.key === null;
    if (isUnkeyedTopLevelFragment) {
      //todo
    }
    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            )
          );
      }
    }
  }

  return reconcileChildFibers;
}

export const reconcileChildFibers = ChildReconciler(true);
