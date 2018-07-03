import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.jpg";
import { DeleteBtn } from "../../components/Buttons";
import { Card, CardTitle, CardBody, CardFooter, CardImg, CardSubtitle, CardText } from "reactstrap";
import "./OwnerView.css";

class OwnerView extends Component {

  state = {
    owner: [],
    pets: []
  }

  componentDidMount() {
    console.log("in mount Owner.js", this.props.location);

    this.getOwner(this.props.location.state.username);

    if (this.props.location.state.fromPage === "CreatePet") {
      console.log("location fromPage CreatePet");
      this.getPets(this.props.location.state.ownerid);
    }
    if (this.props.location.state.pathName === "/petview/") {
      console.log("location pathName petview");
      this.getPets(this.props.location.state.ownerId);
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

  deletePet = event => {
    event.preventDefault();
    console.log("inside deletePet function of OwnerView Page")

    console.log("event.target.value is" + event.target.value);

    const petId = event.target.value;
    console.log("petId is " + petId);

    API.deletePet(petId)
      .then(res =>
        console.log("res ", res), this.props.history.push("/ownerview/", { username: this.state.owner.username, ownerid: this.state.owner.owner_id, fromPage: "/petview/" })
//        this.getPets(this.state.owner[0].owner_id)
      )
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

  petView = (ownerId, petId, username) => {
    this.props.history.push("/petview/", { ownerid: ownerId, petid: petId, username: username })
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
                    <Card onClick={() => this.petView(pet.owner_id, pet.pet_id, this.state.owner[0].username)} >
                      <div>
                        <CardImg top width="100%"
                          src={pet.pet_image}
                          alt="Card image cap"
                          id={pet.pet_id}
                          key={pet.pet_id}
                          onClick={() => this.petView(pet.owner_id, pet.pet_id)}
                        />
                        <CardBody onClick={() => this.petView(pet.owner_id, pet.pet_id)} >
                          <CardTitle>
                            {pet.name}
                          </CardTitle>
                        </CardBody>
                        <CardFooter>
                          <DeleteBtn
                            onClick={this.deletePet}
                            name="pet_id"
                            value={pet.pet_id} >Delete
                            </DeleteBtn>
                        </CardFooter>
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
