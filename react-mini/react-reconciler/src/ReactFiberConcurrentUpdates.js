import { mergeLanes } from "./ReactFiberLane";
import { HostRoot } from "./ReactWorkTags";

let concurrentQueues = null;

export function enqueueConcurrentClassUpdate(fiber, queue, update, lane) {
  // 将update添加到Fiber.updateQueue.shared.interleaved指向的环形链表中
  // Fiber.updateQueue.shared.interleaved指向环形链表中最后一个Update对象
  const interleaved = queue.interleaved;
  if (interleaved === null) {
    // 初次渲染
    update.next = update;
    pushConcurrentUpdateQueue(queue);
  } else {
    // 对比更新
    update.next = interleaved.next;
    interleaved.next = update;
  }
  queue.interleaved = update;
  return markUpdateLaneFromFiberToRoot(fiber, lane);
}

export function pushConcurrentUpdateQueue(queue) {
  if (concurrentQueues === null) {
    concurrentQueues = [queue];
  } else {
    concurrentQueues.push(queue);
  }
}

function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
  sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane);
  let alternate = sourceFiber.alternate;
  if (alternate !== null) {
    alternate.lanes = mergeLanes(alternate.lanes, lane);
  }
  let node = sourceFiber;
  let parent = sourceFiber.return;
  while (parent !== null) {
    parent.childLanes = mergeLanes(parent.childLanes, lane);
    alternate = parent.alternate;
    if (alternate !== null) {
      alternate.childLanes = mergeLanes(alternate.childLanes, lane);
    }
    node = parent;
    parent = parent.return;
  }
  return node.tag === HostRoot ? node.stateNode : null;
}
