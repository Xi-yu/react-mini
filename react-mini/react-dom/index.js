import { createContainer, updateContainer } from "../react-reconciler";

export function createRoot(container) {
  const root = createContainer(container);

  return new ReactDOMRoot(root);
}

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  console.log(children);
  const root = this._internalRoot;
  updateContainer(children, root);
};
