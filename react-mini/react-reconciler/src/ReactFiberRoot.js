import { createHostRootFiber } from "./ReactFiber";
import { initializeUpdateQueue } from "./ReactFiberClassUpdateQueue";

export function createFiberRoot(
  containerInfo,
  tag,
  hydrate,
  initialChildren,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride
) {
  // FiberRoot
  const root = new FiberRootNode(containerInfo, tag, hydrate);
  // HostRootFiber
  const uninitializedFiber = createHostRootFiber(
    tag,
    isStrictMode,
    concurrentUpdatesByDefaultOverride
  );
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;
  uninitializedFiber.memoizedState = {
    element: initialChildren,
    isDehydrated: hydrate,
    cache: null,
  };
  initializeUpdateQueue(uninitializedFiber);
  return root;
}

function FiberRootNode(containerInfo, tag) {
  this.containerInfo = containerInfo;
  this.tag = tag;
}
