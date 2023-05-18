import { HTML_NAMESPACE } from "../../shared/DOMNamespaces";

export function createElement(
  type,
  props,
  rootContainerElement,
  parentNamespace
) {
  let isCustomComponentTag;
  const ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
  let domElement;
  let namespaceURI = parentNamespace;
  if (namespaceURI === HTML_NAMESPACE) {
    namespaceURI = getIntrinsicNamespace(type);
  }
  domElement = ownerDocument.createElement(type);
  return domElement;
}

function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return rootContainerElement;
}
