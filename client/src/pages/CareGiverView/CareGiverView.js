import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Card, CardTitle, CardBody, CardImg } from "reactstrap";
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
              <div className="col-12">
                {this.state.pets.length ? (
                  <div>
                    {this.state.pets.map(pet => (
                      <div className="col-3 pet-card2">
                        <Card onClick={() => this.careGiverPetView(pet.owner_id, pet.pet_id, pet.caregiver_id, this.state.caregiver.username)} >
                          <div>
                            <CardImg div className="pet-img" top width="100%" src={pet.pet_image} alt="Card image cap" id={pet.pet_id} />
                            <CardBody div className="card-cg">
                              <CardTitle>
                                <div className="card-title"><i className="paw3 fas fa-paw"></i>  {pet.name}</div>
                              </CardTitle>
                            </CardBody>
                          </div>
                        </Card>
                      </div>
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
