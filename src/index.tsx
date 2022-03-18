import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

class WebComponent extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      this
    );
  }
}

if (!customElements.get("liferay-devcon")) {
  customElements.define("liferay-devcon", WebComponent);
}
