import React from "react";

export const InputPw = props => (
  <div className="form-group">
    <label htmlFor={props.forattribute}>{props.title}</label>
    <input className="form-control" type="password" id={props.forattribute} {...props} />
  </div>
);
