import React from "react";

export const Input = props => (
  <div className="form-group">
    <label for={props.for}>{props.title}</label>
    <input className="form-control" id={props.for} {...props} />
  </div>
);
