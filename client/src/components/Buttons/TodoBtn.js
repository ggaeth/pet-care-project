import React from "react";
import "./Buttons.css";

export const TodoBtn = props => (
  <div className="row">
    <button {...props} className="btn btn-lg todo-btn">
      {props.children}
    </button>
  </div>
);