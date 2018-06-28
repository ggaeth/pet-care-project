import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { OwnerBtn, CareBtn } from "../../components/Buttons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CatPic from "../../components/CatPic";
import InfoBox from "../../components/InfoBox";
import icon from "../../assets/cat.jpeg";
import "./About.css";

class CarePetView extends Component {
    state = {
        careGiver: {},
      };
      render() {
        return (
     <div className="background">
      <div className="container">
          <div className="row text-left">
            <div className="col-md-7">
          </div>
            <InfoBox />
            <div className="col-md-2">
            </div>
            <div className="col-md-4">
            </div>
     
        
            </div>
            </div>
            </div>
        );
    }
}
    export default CarePetView;


    