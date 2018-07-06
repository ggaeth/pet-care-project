import React from "react";

export const InputBox = props => (
  <div className="form-group">
    <input className="form-control" id={props.forattribute} {...props} />
  </div>
);
