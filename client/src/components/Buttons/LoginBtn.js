import React from "react";
import { Link } from "react-router-dom";

export const LoginBtn = props => (
  <div className="row text-center">
    <button {...props} style={{ marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  </div>
);