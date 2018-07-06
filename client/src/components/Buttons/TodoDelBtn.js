import React from "react";
import "./Buttons.css";

export const TodoDelBtn = props => (
    <button {...props} className="btn btn-sm todo-del-btn">
      {props.children}
    </button>
);