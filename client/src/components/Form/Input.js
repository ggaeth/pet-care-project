import React from "react";

export const Input = props => (
  <div className="form-group">
    <label htmlFor={props.for}>{props.title}</label>
    <input className="form-control" id={props.htmlFor} {...props} />
  </div>
);
