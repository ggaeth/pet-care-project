import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.jpg";
import { Card, CardTitle, CardBody, CardImg, CardSubtitle, CardText } from "reactstrap";
import "./OwnerView.css";

class OwnerView extends Component {

  state = {
    owner: [],
    pets: []
  }

  componentDidMount() {
    console.log("in mount Owner.js", this.props.location.state);
    this.getOwner(this.props.location.state.username);

    if (this.props.location.state.fromPage === "CreatePet") {
      console.log("location fromPage CreatePet");
      this.getPets(this.props.location.state.ownerid);
    }
  };

  getOwner = userName => {
    console.log("inside getOwner function of OwnerView Page")
    console.log(userName);

    API.getOwner(userName)
      .then(res =>
        //        console.log(res.data[0])
        this.setState(
          { owner: res.data },
          () => console.log(this.state)
        )
      )
      .then(res => console.log("owner state ", this.state.owner))
      .then(res => this.hasPets(this.props.location.state))
      .catch(err => console.log(err))
  };

  getPets = ownerId => {
    console.log("inside getPets function of OwnerView Page")
    console.log(ownerId);

    API.getPets(ownerId)
      .then(res =>
        this.setState(
          { pets: res.data },
          console.log("pets res.data in ownerview.js ", res)
        )
      )
      .then(res => console.log("pets state ", this.state.pets))
      .catch(err => console.log(err))
  };

  hasPets() {
    if (this.props.location.state.fromPage === "CreatePet") {
      console.log("hasPets");
      this.getPets(this.props.location.state.ownerid);
    }
  }
  petPage = (id, username) => {
    this.props.history.push("/createpet/", { id: id, username: username })
  };

  petView = (ownerId, petId) => {
    this.props.history.push("/petview/", { ownerid: ownerId, petid: petId })
  };

  // const OwnerView = (props) => {
  render() {
    return (
      <div className="background">
        <div className="container fluid">
          <Jumbotron>
            Owner View
            </Jumbotron>
          <div className="row">

            <div className="col-3">

              <Card onClick={() => this.petPage(this.state.owner[0].owner_id, this.state.owner[0].username)} >
                <CardImg top width="100%" src={icon}
                  alt="Card image cap" />
                <CardBody>
                  <CardTitle>Create Pet</CardTitle>
                </CardBody>
              </Card>
            </div>
            <div className="col-3">
              {this.state.pets.length ? (
                <div>
                  {this.state.pets.map(pet => (
                    <Card onClick={() => this.petView(pet.owner_id, pet.pet_id)} >
                      <div>
                        <CardImg top width="100%"
                          src={pet.pet_image}
                          alt="Card image cap"
                          id={pet.pet_id}
                        />
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

export default OwnerView;
