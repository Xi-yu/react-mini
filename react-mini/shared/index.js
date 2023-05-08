// Symbol.for(key): 如果key在全局注册表中则返回, 否则新建
// Symbol('react.element') === Symbol('react.element') // false
// Symbol.for('react.element') === Symbol.for('react.element') // true
// todo: 用Symbol.for()的目的是?
export const REACT_ELEMENT_TYPE = Symbol.for("react.element");
export const REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
