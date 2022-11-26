import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from "react-redux"
import store from "./store"

ReactDOM.render(
  <Provider store={store}>
    <App />
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {/* <hr color='blue'/> */}
      <h4 className="card-text text-center text-white" style={{ color: "white" }}>
        <span>&#169;</span> Copyright 2020
      </h4>
    </div>
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
