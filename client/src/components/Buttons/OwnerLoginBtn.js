import React from "react";

export const OwnerLoginBtn = props => (
  <div className="row text-center">
    <button {...props} style={{ marginBottom: 10 }} className="OwnerLoginBtn btn btn-lg">
      {props.children}
    </button>
  </div>
);