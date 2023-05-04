import { getCurrentEventPriority } from "./ReactFiberConfig";
import { ConcurrentMode, NoMode } from "./ReactTypeOfMode";

export function requestUpdateLane(fiber) {
  const mode = fiber.mode;
  if ((mode & ConcurrentMode) === NoMode) {
    return SyncLane;
  }
  const eventLane = getCurrentEventPriority();
  return eventLane;
}

export function scheduleUpdateOnFiber(root, fiber, lane) {}
