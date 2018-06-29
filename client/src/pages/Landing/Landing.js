import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import DogPic from "../../components/DogPic";
import CatPic from "../../components/CatPic";
import InfoBox from "../../components/InfoBox";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { LoginBtn, CreateAcctBtn, OwnerBtn, CareBtn } from "../../components/Buttons";
import { CardHead, CardBody } from "../../components/Card";
import Create from "../Create";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="background">
      
        <div className="container">
          <div className="row">
            <div className="col-12">
           
              <DogPic>
              <div className="layer">
                <h1 className="title"> Welcome to Pet Purfect</h1>
                <h2 className="description">All Pets <i className="fas fa-paw"></i> All Care</h2>
                {/* <h3 className="description">Do you need a Caregiver for your pet?</h3> */}
                <div>
                  <Link to="/login">
                    <Button className="LoginBtn btn btn-lg">Login</Button>
                    
                 </Link>
                 </div>
                <Button className="CreateAcctBtn btn-lg" onClick={this.toggle}>Create Account</Button>
                {/* dog pic was here */}
                </div>
              </DogPic>
         
          </div>
          </div>
       
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Pick Account Type</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                  
                    <CardHead
                      value="Create Pet Owner Account"
                    />
                    <CardBody>
                      <Link to="/createowner" className="btn-link">
                        <OwnerBtn>
                          Owner
                      </OwnerBtn>
                      </Link>
                    </CardBody>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <CardHead
                      value="Create Care Giver Account"
                    />
                    <CardBody>
                      <Link to="/createcare" className="btn-link">
                        <CareBtn>
                          Caregiver
                        </CareBtn>
                      </Link>
                    </CardBody>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
          

         </div>
         <Footer />
        </div>
      
    );
  }

}

export default Landing;
