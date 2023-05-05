import { DefaultLane } from "./ReactFiberLane";

export const noTimeout = -1;

export function getCurrentEventPriority() {
  return DefaultLane;
}
