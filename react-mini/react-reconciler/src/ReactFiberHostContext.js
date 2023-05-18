const rootInstanceStackCursor = { current: {} };
const contextStackCursor = { current: {} };

export function pushHostContainer(fiber, nextRootInstance) {
  rootInstanceStackCursor.current = nextRootInstance;
}

export function getRootHostContainer() {
  return rootInstanceStackCursor.current;
}

export function getHostContext() {
  // todo
  return contextStackCursor.current;
}
