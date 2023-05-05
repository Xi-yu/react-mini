import { enqueueConcurrentClassUpdate } from "./ReactFiberConcurrentUpdates";
import { NoLanes } from "./ReactFiberLane";

export const UpdateState = 0;

export function initializeUpdateQueue(fiber) {
  const queue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
      lanes: NoLanes,
    },
    effects: null,
  };

  fiber.updateQueue = queue;
}

export function createUpdate(eventTime, lane) {
  const update = {
    eventTime,
    lane,
    tag: UpdateState,
    payload: null,
    callback: null,
    next: null,
  };

  return update;
}

export function enqueueUpdate(fiber, update, lane) {
  const updateQueue = fiber.updateQueue;
  if (updateQueue === null) {
    return null;
  }
  const sharedQueue = updateQueue.shared;
  return enqueueConcurrentClassUpdate(fiber, sharedQueue, update, lane);
}