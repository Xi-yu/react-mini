import { createElement } from "./ReactDOMComponent";
import { DefaultLane } from "../../react-reconciler/src/ReactFiberLane";
import { precacheFiberNode, updateFiberProps } from "./ReactDOMComponentTree";

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
  precacheFiberNode(internalInstanceHandle, domElement);
  updateFiberProps(domElement, props);
  return domElement;
}

export function appendInitialChild(parentInstance, child) {
  parentInstance.appendChild(child);
}

export function finalizeInitialChildren(
  domElement,
  type,
  props,
  rootContainerInstance,
  hostContext
) {
  setInitialProperties(domElement, type, props, rootContainerInstance);
  switch (type) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!props.autoFocus;
    case "img":
      return true;
    default:
      return false;
  }
}

export function setInitialProperties(
  domElement,
  tag,
  rawProps,
  rootContainerElement
) {
  let props;
  switch (tag) {
    case "dialog":
      // todo
      break;
    case "iframe":
    case "object":
    case "embed":
      // todo
      break;
    case "video":
    case "audio":
      // todo
      break;
    case "source":
      // todo
      break;
    case "img":
    case "image":
    case "link":
      // todo
      break;
    case "details":
      // todo
      break;
    case "input":
      // todo
      break;
    case "option":
      // todo
      break;
    case "select":
      // todo
      break;
    case "textarea":
      // todo
      break;
    default:
      props = rawProps;
  }

  assertValidProps(tag, props);

  setInitialDOMProperties(
    tag,
    domElement,
    rootContainerElement,
    props,
    isCustomComponentTag
  );

  switch (tag) {
    case "input":
      // todo
      break;
    case "textarea":
      // todo
      break;
    case "option":
      // todo
      break;
    case "select":
      // todo
      break;
    default:
      if (typeof props.onClick === "function") {
        // todo
      }
      break;
  }
}
