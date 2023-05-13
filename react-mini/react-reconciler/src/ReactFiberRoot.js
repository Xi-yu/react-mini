import { createHostRootFiber } from "./ReactFiber";
import { initializeUpdateQueue } from "./ReactFiberClassUpdateQueue";
import { noTimeout } from "./ReactDOMHostConfig";
import { NoLane, NoLanes, NoTimestamp, createLaneMap } from "./ReactFiberLane";

export function createFiberRoot(
  containerInfo,
  tag,
  hydrate,
  initialChildren,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride,
  identifierPrefix
) {
  // FiberRoot
  const root = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix);
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
    transitions: null,
    pendingSuspenseBoundaries: null,
  };
  initializeUpdateQueue(uninitializedFiber);
  return root;
}

function FiberRootNode(
  containerInfo,
  tag,
  hydrate,
  identifierPrefix,
  onRecoverableError
) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.current = null;
  this.pingCache = null;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.callbackNode = null;
  this.callbackPriority = NoLane;
  this.eventTimes = createLaneMap(NoLanes);
  this.expirationTimes = createLaneMap(NoTimestamp);

  this.pendingLanes = NoLanes;
  this.suspendedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;
  this.finishedLanes = NoLanes;

  this.entangledLanes = NoLanes;

  this.identifierPrefix = identifierPrefix;
  this.onRecoverableError = onRecoverableError;
}
