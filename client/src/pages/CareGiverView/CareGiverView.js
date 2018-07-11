import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import { Link } from "react-router-dom";

import { CreateBtn } from "../../components/Buttons";
import { Input, InputRow, TextArea } from "../../components/Form";

import icon from "../../assets/icon.jpg";
import { Card, CardTitle, CardBody, CardImg, CardSubtitle, CardText } from "reactstrap";
// import Create from "../Create";
import "./CareGiverView.css";

class CareGiverView extends Component {
  state = {
    caregiver: {},
    pets: []
  }
  
  componentDidMount() {
    this.getCg(this.props.location.state.username);
  };

  getCg = userName => {

    API.getCg(userName)
      .then(res =>
        this.setState(
          { caregiver: res.data[0] }
        )
      )
      .then(res => this.getPetsCg(this.state.caregiver.caregiver_id))
      .catch(err => console.log(err))
  };

  
  getPetsCg = CgId => {

    API.getPetsCg(CgId)
      .then(res =>
        this.setState(
          { pets: res.data }
        )
      )
      .catch(err => console.log(err))
  };

  careGiverPetView = (ownerId, petId, CgId, cguserName) => {
    this.props.history.push("/caregiverpetview/", { ownerId: ownerId, CgId: CgId, petid: petId, cgUserName: cguserName })
  };

  render() {
    return (
      <div className="background">
        <div className="container fluid">
          <Jumbotron>
            <div className="cg"><i className="fas fa-paw"></i> Caregiver View</div>
            </Jumbotron>
            <div className="background">
          <div className="row">
            <div className="col-3">
              {this.state.pets.length ? (
                <div>
                {this.state.pets.map(pet => (
                <Card onClick={() => this.careGiverPetView(pet.owner_id, pet.pet_id,pet.caregiver_id, this.state.caregiver.username)} >
                  
                    <div>
                      <CardImg div className="pet-img" top width="100%" src={pet.pet_image} alt="Card image cap" id={pet.pet_id} />

                      <CardBody div className="card-cg">
                        <CardTitle>
                        <div className="card-title"><i className="paw3 fas fa-paw"></i>  {pet.name}</div>
                        </CardTitle>
                      </CardBody>
                    </div>
                  
                </Card>
                
                  ))}
                  </div>
                  
              ) : (

                <div className="row">
                  <div className="no-pet2 col-md-12"><i className="fas fa-paw"></i>No Pets</div>
                  </div>
                )}
            </div>
            </div>
            </div>
            <div className="space2"></div>
            </div>
            <Footer />
      </div>


    );
  }
}

export default CareGiverView;
