import { createContainer, updateContainer } from "../react-reconciler";
import { ConcurrentRoot } from "../react-reconciler/src/ReactRootTags";

export function createRoot(container) {
  let isStrictMode = false;
  let concurrentUpdatesByDefaultOverride = false;
  const root = createContainer(
    container,
    ConcurrentRoot,
    null,
    isStrictMode,
    concurrentUpdatesByDefaultOverride
  );

  return new ReactDOMRoot(root);
}

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot;
  updateContainer(children, root, null, null);
};
