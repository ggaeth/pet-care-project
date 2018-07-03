import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
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
    console.log("in mount CareGiverView.js", this.props.location.state);

    this.getCg(this.props.location.state.username);

      console.log("location fromPage caregiverview");
      console.log(this.props.location);
      console.log("Caregiver state is");
      console.log(this.state.caregiver);

      //const CgId = this.state.caregiver.caregiver_id;
      //this.getPetsCg(CgId);
    
  };

  getCg = userName => {
    console.log("inside getOwner function of OwnerView Page")
    console.log(userName);

    API.getCg(userName)
      .then(res =>
        //        console.log(res.data[0])
        this.setState(
          { caregiver: res.data[0] },
          () => console.log(this.state)
        )
      )
      .then(res => console.log("cg state ", this.state.caregiver))
      .then(res => this.getPetsCg(this.state.caregiver.caregiver_id))
      .catch(err => console.log(err))
  };

  
  getPetsCg = CgId => {
    console.log("inside getPetsCg function of CareGiverView")
    console.log(CgId);

    API.getPetsCg(CgId)
      .then(res =>
        //        console.log(res.data[0])
        this.setState(
          { pets: res.data },
          () => console.log(this.state)
        )
      )
      .then(res => console.log("CG state ", this.state.pets))
      //.then(res => this.hasPets(this.props.location.state))
      .catch(err => console.log(err))
  };

  petView = (CgId, petId) => {
    this.props.history.push("/petview/", { CgId: CgId, petid: petId })
  };

  render() {
    return (
      <div className="background">
        <div className="container fluid">
          <Jumbotron>
            Caregiver View
            </Jumbotron>
          <div className="row">
            <div className="col-3">
              {this.state.pets.length ? (
                <div>
                {this.state.pets.map(pet => (
                <Card onClick={() => this.careGiverPetView(pet.owner_id, pet.pet_id,pet.caregiver_id)} >
                  
                    <div>
                      <CardImg top width="100%" src={pet.pet_image} alt="Card image cap" id={pet.pet_id} />

                      <CardBody>
                        <CardTitle>
                          {pet.name}
                        </CardTitle>
                      </CardBody>
                    </div>
                  
                </Card>
                  ))}
                  </div>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default CareGiverView;
