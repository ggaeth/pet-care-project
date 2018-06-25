import React from "react";
import "./Buttons.css";

export const AddBtn = props => (
  <div className="row text-center">
    <button {...props} className=" AddBtn btn btn-sm btn-success">
      {props.children}
    </button>
  </div>
);