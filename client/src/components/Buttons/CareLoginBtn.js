import React from "react";
import "./Buttons.css";
export const CareLoginBtn = props => (
  <div className="row text-center">
    <button {...props} style={{ marginBottom: 10 }} className="CareLoginBtn btn btn-lg">
      {props.children}
    </button>
  </div>
);