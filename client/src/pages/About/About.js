import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DogPic from "../../components/DogPic";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { OwnerBtn, CareBtn } from "../../components/Buttons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InfoBox from "../../components/InfoBox";
import "./About.css";

class CarePetView extends Component {
    state = {
        careGiver: {},
      };
      render() {
        return (
     <div className="background">
      <div className="container-fluid">

      <DogPic>
            <div className="col-md-8">
          </div>
            <InfoBox />
            
            </DogPic>
        
             {/* </div> */}
            </div>
            <Footer />
             </div>
        );
    }
}
    export default CarePetView;

    