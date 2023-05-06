export function push(heap, node) {
  const index = heap.length;
  heap.push(node);
  siftUp(heap, node, index);
}

export function peek(heap) {
  return heap.length === 0 ? null : heap[0];
}

export function pop(heap) {
  if (heap.length === 0) {
    return null;
  }
  const first = heap[0];
  const last = heap.pop();
  if (first !== last) {
    heap[0] = last;
    siftDown(heap, last, 0);
  }
  return first;
}

export function siftUp(heap, node, i) {
  let index = i;
  while (index > 0) {
    const parentIndex = (index - 1) >>> 1;
    const parent = heap[parentIndex];
    if (compare(parent, node) > 0) {
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      return;
    }
  }
}

function siftDown(heap, node, i) {
  let index = i;
  const length = heap.length;
  const halfLength = length >>> 1;
  while (index < halfLength) {
    const leftIndex = (index << 1) + 1;
    const rightIndex = leftIndex + 1;
    const left = heap[leftIndex];
    const right = heap[rightIndex];
    if (compare(left, node) < 0) {
      if (rightIndex < length && compare(right, left) < 0) {
        // right < left < node时, 交换node和right
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        // left < node && left < right时, 交换node和left
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (rightIndex < length && compare(right, node) < 0) {
      // left > node && right < node时, 交换node和right
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // node < left && node < right时, 退出循环
      return;
    }
  }
}

// 首先比较sortIndex(即expirationTime), 如果一样, 就比较id
function compare(a, b) {
  const diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}
