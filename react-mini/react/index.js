import { REACT_ELEMENT_TYPE } from "../shared";

// todo: 这是干什么的？
const ReactCurrentOwner = {
  current: null,
};

const React = {
  createElement: function (type, config, children) {
    const props = {};
    let key = null;
    let ref = null;
    let self = null;
    let source = null;

    // todo: 处理config, 暂时还用不上
    if (config !== null) {
    }

    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      const childArray = new Array(childrenLength);
      for (let i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[2 + i];
      }
      props.children = childArray;
    }

    return ReactElement(
      type,
      key,
      ref,
      self,
      source,
      ReactCurrentOwner.current,
      props
    );
  },
};

function ReactElement(type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  };

  return element;
}

window.React = React;
export default React;
