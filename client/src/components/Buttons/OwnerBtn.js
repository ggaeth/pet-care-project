import React from "react";

export const OwnerBtn = props => (
  <div className="row text-center">
    <button {...props} style={{ marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  </div>
);