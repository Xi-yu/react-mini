// React必须引入，因为要使用React.createElement方法，将jsx转为ReactElement
import React from "../../react-mini/react/index.js";
import { createRoot } from "../../react-mini/react-dom/index.js";
import App from "./app.js";

createRoot(document.getElementById("app")).render(App);
