import {
  ConcurrentRoot,
  createContainer,
  updateContainer,
} from "../../react-reconciler";
import { markContainerAsRoot } from "./ReactDOMComponentTree";

export function createRoot(container, options) {
  let isStrictMode = false;
  let concurrentUpdatesByDefaultOverride = false;
  let identifierPrefix = "";
  const root = createContainer(
    container,
    ConcurrentRoot,
    null,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix
  );

  markContainerAsRoot(root.current, container);

  return new ReactDOMRoot(root);
}

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot;
  updateContainer(children, root, null, null);
};
