import React from "react";
import { Link } from "react-router-dom";

export const LoginBtn = props => (
  <div className="row">
    <button {...props} className="LoginBtn btn btn-lg">
      {props.children}
    </button>
  </div>
);