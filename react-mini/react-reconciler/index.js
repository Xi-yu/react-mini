export function createContainer(containerInfo) {
  return createFiberRoot(containerInfo);
}

export function createFiberRoot(containerInfo) {
  return new FiberRootNode(containerInfo);
}

function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo;
}

export function updateContainer(element, container) {}
