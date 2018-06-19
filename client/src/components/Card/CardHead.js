import React from "react";
import "./Card.css";

export const CardHead = props => (
  <div className="card-header">
    {props.value}
    {props.children}
  </div>
);

