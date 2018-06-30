import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.jpg";
import { Card, CardTitle, CardBody, CardImg, CardSubtitle, CardText } from "reactstrap";
// import Create from "../Create";
import "./CareGiverView.css";

class CareGiverView extends Component {

  state = {
    caregiver: [],
    pets: []
  }



  componentDidMount() {
    console.log("in mount CareGiverView.js", this.props.location.state);
    this.getCareGiver(this.props.location.state.username);
    // if (this.props.location.state.fromPage === "CreatePet") {
    //   console.log("add getPets");
    //   this.getPets(this.props.location.state.ownerid);
    // }
  };


  getCareGiver = userName => {
    console.log(userName);

    API.getCareGiver(userName)
      .then(res =>
        this.setState(
          { caregiver: res.data },
         
          console.log("res.data in caregiverview.js ", res)
        )
      )
      .then(res => console.log("caregiver state ", this.state.caregiver))
      .then(res => this.getPets(this.props.location.state))
      .catch(err => console.log(err))

  };

  getPets = CareGiverId => {
    console.log(CareGiverId);

    API.getPets(CareGiverId)
      .then(res =>
        this.setState(
          { pets: res.data },
          console.log("pets res.data in caregiverview.js ", res)
        )
      )
      .then(res => console.log("pets state ", this.pets.caregiver))
      .catch(err => console.log(err))

  };

  // petPage = (id, username) => {
  //   this.props.history.push("/create/", { id: id, username: username })
  // };

  careGiverPetView = (ownerId, petId,caregiverId) => {
    this.props.history.push("/caregiverpetview/", { ownerid: ownerId, petid: petId , caregiverid: caregiverId})
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
