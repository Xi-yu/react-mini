export const NoLanes = 0b0000000000000000000000000000000;
export const NoLane = 0b0000000000000000000000000000000;
export const SyncLane = 0b0000000000000000000000000000001;
export const InputContinuousHydrationLane = 0b0000000000000000000000000000010;
export const InputContinuousLane = 0b0000000000000000000000000000100;
export const DefaultHydrationLane = 0b0000000000000000000000000001000;
export const DefaultLane = 0b0000000000000000000000000010000;

const TransitionHydrationLane = 0b0000000000000000000000000100000;
const TransitionLanes = 0b0000000001111111111111111000000;
const TransitionLane1 = 0b0000000000000000000000001000000;
const TransitionLane2 = 0b0000000000000000000000010000000;
const TransitionLane3 = 0b0000000000000000000000100000000;
const TransitionLane4 = 0b0000000000000000000001000000000;
const TransitionLane5 = 0b0000000000000000000010000000000;
const TransitionLane6 = 0b0000000000000000000100000000000;
const TransitionLane7 = 0b0000000000000000001000000000000;
const TransitionLane8 = 0b0000000000000000010000000000000;
const TransitionLane9 = 0b0000000000000000100000000000000;
const TransitionLane10 = 0b0000000000000001000000000000000;
const TransitionLane11 = 0b0000000000000010000000000000000;
const TransitionLane12 = 0b0000000000000100000000000000000;
const TransitionLane13 = 0b0000000000001000000000000000000;
const TransitionLane14 = 0b0000000000010000000000000000000;
const TransitionLane15 = 0b0000000000100000000000000000000;
const TransitionLane16 = 0b0000000001000000000000000000000;

const RetryLanes = 0b0000111110000000000000000000000;
const RetryLane1 = 0b0000000010000000000000000000000;
const RetryLane2 = 0b0000000100000000000000000000000;
const RetryLane3 = 0b0000001000000000000000000000000;
const RetryLane4 = 0b0000010000000000000000000000000;
const RetryLane5 = 0b0000100000000000000000000000000;

export const SelectiveHydrationLane = 0b0001000000000000000000000000000;
export const IdleHydrationLane = 0b0010000000000000000000000000000;
export const IdleLane = 0b0100000000000000000000000000000;

export const OffscreenLane = 0b1000000000000000000000000000000;

const NonIdleLanes = 0b0001111111111111111111111111111;

export function mergeLanes(a, b) {
  return a | b;
}

export function markRootUpdated(root, updateLane) {
  root.pendingLanes |= updateLane;
}

export const NoTimestamp = -1;

export function getNextLanes(root, wipLanes) {
  const pendingLanes = root.pendingLanes;
  if (pendingLanes === NoLanes) {
    return NoLanes;
  }

  let nextLanes = NoLanes;
  const suspendedLanes = root.suspendedLanes;
  const pingedLanes = root.pingedLanes;
  const nonIdlePendingLanes = pendingLanes & NonIdleLanes;
  if (nonIdlePendingLanes !== NoLanes) {
    const nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes;
    if (nonIdleUnblockedLanes !== NoLanes) {
      nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes);
    } else {
      const nonIdlePingedLanes = nonIdlePendingLanes & pingedLanes;
      if (nonIdlePingedLanes !== NoLanes) {
        nextLanes = getHighestPriorityLanes(nonIdlePingedLanes);
      }
    }
  } else {
    // todo
  }
  // todo - wipLanes
  return nextLanes;
}

function getHighestPriorityLanes(lanes) {
  switch (getHighestPriorityLane(lanes)) {
    case SyncLane:
      return SyncLane;
    case InputContinuousHydrationLane:
      return InputContinuousHydrationLane;
    case InputContinuousLane:
      return InputContinuousLane;
    case DefaultHydrationLane:
      return DefaultHydrationLane;
    case DefaultLane:
      return DefaultLane;
    case TransitionHydrationLane:
      return TransitionHydrationLane;
    case TransitionLane1:
    case TransitionLane2:
    case TransitionLane3:
    case TransitionLane4:
    case TransitionLane5:
    case TransitionLane6:
    case TransitionLane7:
    case TransitionLane8:
    case TransitionLane9:
    case TransitionLane10:
    case TransitionLane11:
    case TransitionLane12:
    case TransitionLane13:
    case TransitionLane14:
    case TransitionLane15:
    case TransitionLane16:
      return lanes & TransitionLanes;
    case RetryLane1:
    case RetryLane2:
    case RetryLane3:
    case RetryLane4:
    case RetryLane5:
      return lanes & RetryLanes;
    case SelectiveHydrationLane:
      return SelectiveHydrationLane;
    case IdleHydrationLane:
      return IdleHydrationLane;
    case IdleLane:
      return IdleLane;
    case OffscreenLane:
      return OffscreenLane;
    default:
      return lanes;
  }
}

// 分离出最高优先级(返回二进制最右边的1)
export function getHighestPriorityLane(lanes) {
  return lanes & -lanes;
}

export function includesNonIdleWork(lanes) {
  return (lanes & NonIdleLanes) !== NoLanes;
}

export function includesSomeLane(a, b) {
  return (a & b) !== NoLanes;
}

export function isSubsetOfLanes(set, subset) {
  return (set & subset) === subset;
}
