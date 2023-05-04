import { DefaultLane } from "./ReactFiberLane";

export function getCurrentEventPriority() {
  return DefaultLane;
}
