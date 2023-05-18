import { createElement } from "../../react-dom/src/ReactDOMComponent";
import { DefaultLane } from "./ReactFiberLane";

export const noTimeout = -1;

export function getCurrentEventPriority() {
  return DefaultLane;
}

export function shouldSetTextContent(type, props) {
  return (
    type === "textarea" ||
    type === "noscript" ||
    typeof props.children === "string" ||
    typeof props.children === "number" ||
    (typeof props.dangerouslySetInnerHTML === "object" &&
      props.dangerouslySetInnerHTML !== null &&
      props.dangerouslySetInnerHTML.__html != null)
  );
}

export function createInstance(
  type,
  props,
  rootContainerInstance,
  hostContext,
  internalInstanceHandle
) {
  const domElement = createElement(
    type,
    props,
    rootContainerInstance,
    hostContext
  );
  return domElement;
}
