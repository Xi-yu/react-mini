export const NoLanes = 0b0000000000000000000000000000000;
export const SyncLane = 0b0000000000000000000000000000010;
export const DefaultLane = 0b0000000000000000000000000100000;

export function mergeLanes(a, b) {
  return a | b;
}
