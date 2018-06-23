import React from "react";

export const Input = props => (
  <div className="form-group">
    <label htmlFor={props.forattribute}>{props.title}</label>
    <input className="form-control" id={props.forattribute} {...props} />
  </div>
);
