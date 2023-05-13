import { enqueueConcurrentClassUpdate } from "./ReactFiberConcurrentUpdates";
import { NoLane, NoLanes, isSubsetOfLanes, mergeLanes } from "./ReactFiberLane";
import { markSkippedUpdateLanes } from "./ReactFiberWorkLoop";

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
    // 只有在Fiber已经被卸载时进入
    return null;
  }
  const sharedQueue = updateQueue.shared;
  return enqueueConcurrentClassUpdate(fiber, sharedQueue, update, lane);
}

// 浅拷贝
// current.updateQueue.baseState === workInProgress.updateQueue.baseState
// current.updateQueue.firstBaseUpdate === workInProgress.updateQueue.firstBaseUpdate
// current.updateQueue.lastBaseUpdate === workInProgress.updateQueue.lastBaseUpdate
// current.updateQueue.shared === workInProgress.updateQueue.shared
// current.updateQueue.effects === workInProgress.updateQueue.effects
export function cloneUpdateQueue(current, workInProgress) {
  const queue = workInProgress.updateQueue;
  const currentQueue = current.updateQueue;
  if (queue === currentQueue) {
    const clone = {
      baseState: currentQueue.baseState,
      firstBaseUpdate: currentQueue.firstBaseUpdate,
      lastBaseUpdate: currentQueue.lastBaseUpdate,
      shared: currentQueue.shared,
      effects: currentQueue.effects,
    };
    workInProgress.updateQueue = clone;
  }
}

// 遍历updateQueue.shared.pending, 提取有足够优先级的update对象, 计算出最终的状态 workInProgress.memoizedState
export function processUpdateQueue(
  workInProgress,
  nextProps,
  instance,
  renderLanes
) {
  const queue = workInProgress.updateQueue;
  let firstBaseUpdate = queue.firstBaseUpdate;
  let lastBaseUpdate = queue.lastBaseUpdate;
  let pendingQueue = queue.shared.pending;
  if (pendingQueue !== null) {
    queue.shared.pending = null;
    const lastPendingUpdate = pendingQueue; // workInProgress.updateQueue.shared.pending
    const firstPendingUpdate = lastPendingUpdate.next; // workInProgress.updateQueue.shared.pending.next
    // 将环形链表从last和first之间断开
    lastPendingUpdate.next = null;
    // 断开后接到lastBaseUpdate的后面
    if (lastBaseUpdate === null) {
      firstBaseUpdate = firstPendingUpdate;
    } else {
      lastBaseUpdate.next = firstPendingUpdate;
    }
    lastBaseUpdate = lastPendingUpdate;
    const current = workInProgress.alternate;
    if (current !== null) {
      // 如果current存在的话, 跟上面一样, 将断开后的pending链表接到lastBaseUpdate的后面
      const currentQueue = current.updateQueue;
      const currentLastBaseUpdate = currentQueue.lastBaseUpdate;
      if (currentLastBaseUpdate !== lastBaseUpdate) {
        if (currentLastBaseUpdate === null) {
          currentQueue.firstBaseUpdate = firstPendingUpdate;
        } else {
          currentLastBaseUpdate.next = firstPendingUpdate;
        }
        currentQueue.lastBaseUpdate = lastPendingUpdate;
      }
    }
  }
  if (firstBaseUpdate !== null) {
    let newState = queue.baseState; // workInProgress.updateQueue.baseState
    let newLanes = NoLanes;
    let newBaseState = null;
    let newFirstBaseUpdate = null;
    let newLastBaseUpdate = null;
    let update = firstBaseUpdate;
    do {
      const updateLane = update.lane;
      const updateEventTime = update.eventTime;
      if (!isSubsetOfLanes(renderLanes, updateLane)) {
        // todo
        // update优先级不足, 跳过
        const clone = {
          eventTime: updateEventTime,
          lane: updateLane,
          tag: update.tag,
          payload: update.payload,
          callback: update.callback,
          next: null,
        };
        if (newLastBaseUpdate === null) {
          newFirstBaseUpdate = newLastBaseUpdate = clone;
          newBaseState = newState;
        } else {
          newLastBaseUpdate = newLastBaseUpdate.next = clone;
        }
        newLanes = mergeLanes(newLanes, updateLane);
      } else {
        if (newLastBaseUpdate !== null) {
          // todo
          const clone = {
            eventTime: updateEventTime,
            lane: NoLane,
            tag: update.tag,
            payload: update.payload,
            callback: update.callback,
            next: null,
          };
          newLastBaseUpdate = newLastBaseUpdate.next = clone;
        }
        // 把 workInProgress.updateQueue.shared.pending.next.payload 和 workInProgress.updateQueue.baseState 合并
        // newState 就是 workInProgress.updateQueue.baseState.element = workInProgress.updateQueue.shared.pending.next.payload.element 赋值后的浅拷贝
        newState = getStateFromUpdate(
          workInProgress,
          queue, // workInProgress.updateQueue
          update, // workInProgress.updateQueue.shared.pending.next
          newState, // workInProgress.updateQueue.baseState
          nextProps, // workInProgress.pendingProps
          instance // null
        );
        const callback = update.callback;
        if (callback !== null && update.lane !== NoLane) {
          // todo
        }
      }
      update = update.next;
      if (update === null) {
        pendingQueue = queue.shared.pending;
        if (pendingQueue === null) {
          break;
        } else {
          // todo
          break;
        }
      }
    } while (true);
    if (newLastBaseUpdate === null) {
      newBaseState = newState;
    }
    queue.baseState = newBaseState;
    queue.firstBaseUpdate = newFirstBaseUpdate;
    queue.lastBaseUpdate = newLastBaseUpdate;
    const lastInterleaved = queue.shared.interleaved;
    if (lastInterleaved !== null) {
      // todo
    } else if (firstBaseUpdate === null) {
      // todo
    }
    markSkippedUpdateLanes(newLanes);
    workInProgress.lanes = newLanes;
    workInProgress.memoizedState = newState;
  }
}

function getStateFromUpdate(
  workInProgress,
  queue,
  update,
  prevState, // workInProgress.updateQueue.baseState
  nextProps,
  instance
) {
  switch (update.tag) {
    case UpdateState:
      const payload = update.payload;
      let partialState;
      if (typeof payload === "function") {
        // todo
      } else {
        partialState = payload; // workInProgress.updateQueue.shared.pending.next.payload
      }
      if (partialState === null || partialState === undefined) {
        return prevState;
      }
      return Object.assign({}, prevState, partialState);
  }
}
