import React from "react";
import "./Buttons.css";

export const DeleteBtn = props => (
  <div className="row text-center">
    <button {...props} className="DeleteBtn btn btn-md btn-success">
      {props.children}
    </button>
  </div>
);