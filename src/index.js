import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorker.js')
      .then(reg => {
        // registration worked
        console.log('[Service Worker] Registration succeeded. Scope is ' + reg.scope);
      }).catch(error => {
        // registration failed
        console.log('[Service Worker] Registration failed with ' + error);
      });
  }
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
