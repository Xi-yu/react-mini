import { REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE } from "../../shared";
import { createFiberFromElement } from "./ReactFiber";
import { Placement } from "./ReactFiberFlags";

function ChildReconciler(shouldTrackSideEffects) {
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) {
      return null;
    }
    // todo
  }

  function placeSingleChild(newFiber) {
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.flags |= Placement;
    }
    return newFiber;
  }

  function reconcileSingleElement(
    returnFiber,
    currentFirstChild,
    element,
    lanes
  ) {
    const key = element.key;
    let child = currentFirstChild;
    while (child !== null) {
      //todo
    }

    if (element.type === REACT_FRAGMENT_TYPE) {
      // todo
    } else {
      const created = createFiberFromElement(element, returnFiber.mode, lanes);
      created.ref = coerceRef(returnFiber, currentFirstChild, element);
      created.return = returnFiber;
      return created;
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
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

  return reconcileChildFibers;
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);

function coerceRef(returnFiber, current, element) {
  const mixedRef = element.ref;
  if (
    mixedRef !== null &&
    typeof mixedRef !== "function" &&
    typeof mixedRef !== "object"
  ) {
    // todo
  }
  return mixedRef;
}
