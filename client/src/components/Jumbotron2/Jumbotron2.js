import React from "react";
import "./Jumbotron2.css";

const Jumbotron2 = props => (
  <div
    style={{ clear: "both", textAlign: "center" }}
    className="jumbotron-image jumbotron"
  >
    {props.value}
    {props.children}
  </div>
);

export default Jumbotron2;
