import React from "react";

export const LoginBtn = props => (
  <div className="row">
    <button {...props} type="button" className="LoginBtn btn btn-lg">
      {props.children}
    </button>
  </div>
);