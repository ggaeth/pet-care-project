import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { CardTitle, CardBody, CardImg, CardSubtitle, CardText} from "reactstrap";
// import Create from "../Create";
import "./OwnerView.css";

const OwnerView = (props) => {

    return (
      <div className="background">
      <div className="container fluid">
      <Jumbotron>
            Owner View
            </Jumbotron>
        <div className="row">
        
          <div className="col-3">
          
          
         
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
          <CardTitle>Pet Name</CardTitle>
            </CardBody>
    </div>
    <div className="col-3">
          
         
          <CardImg top width="100%" src="" alt="Card image cap" />
          <CardBody>
        <CardTitle>Pet Name</CardTitle>
          </CardBody>
  </div>
      </div>
       </div>
       </div>
       
      
    );
  }


export default OwnerView;
