import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {messaging} from "./firebase";

messaging.requestPermission()
  .then(res => {
    // 若允許通知 -> 向 firebase 拿 token
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
          .then(function (reg) {
            console.log(reg);
          }).catch(function (error) {
            console.log('Registration failed with ' + error);
          });
      });
    }
    return messaging.getToken();
  }, err => {
    // 若拒絕通知
    console.log(err);  
  })
  .then(token => {
    // 成功取得 token
    console.log(token);
  })
  messaging.onMessage(payload => {
    console.log('onMessage: ', payload);
    var notifyMsg = payload.notification;
    var notification = new Notification(notifyMsg.title, {
        body: notifyMsg.body,
        icon: notifyMsg.icon
    });
    notification.onclick = function (e) { // 綁定點擊事件
        e.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open(notifyMsg.click_action);
    }
})
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
