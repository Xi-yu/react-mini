import { createUpdate, enqueueUpdate } from "./ReactFiberClassUpdateQueue";
import { createFiberRoot } from "./ReactFiberRoot";
import { requestUpdateLane } from "./ReactFiberWorkLoop";

export function createContainer(
  containerInfo,
  tag,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride
) {
  const hydrate = false;
  const initialChildren = null;
  return createFiberRoot(
    containerInfo,
    tag,
    hydrate,
    initialChildren,
    hydrationCallbacks,
    isStrictMode,
    concurrentUpdatesByDefaultOverride
  );
}

export function updateContainer(element, container, parentComponent, callback) {
  console.log(container);
  const current = container.current;
  const lane = requestUpdateLane(current);
  const update = createUpdate(lane);
  update.payload = { element };
  update.callback = callback === undefined ? null : callback;
  const root = enqueueUpdate(current, update, lane);
  if (root !== null) {
    scheduleUpdateOnFiber(root, current, lane);
  }
  return lane;
}
