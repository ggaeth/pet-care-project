import React from "react";
import "./Card.css";

export const CardBody = props => (
  <div className="card-body">
    {props.children}
  </div>
);

