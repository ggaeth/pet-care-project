import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { AddBtn, DeleteBtn, CreateBtn } from "../../components/Buttons";
import { Input, InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import { Container } from "../../components/Grid";
import "./CarePetView.css";

class CarePetView extends Component {
  state = {
    pet: {},
    petTodos: [],
    editPet: "N",
    owner: {}
  };

  componentDidMount() {
    console.log("in mount CarePetView.js", this.props.location.state);
    console.log("running getOnePet from componentDidMount");
    this.getOnePet(this.props.location.state.petid);

    //    if (this.props.location.state.fromPage === "CreatePet") {
    //      console.log("location fromPage CreatePet");
    //      this.getPets(this.props.location.state.ownerid);
    //    }
    //console.log("running getTodosByPetId from componentDidMount");
    //this.getTodosByPetId(this.props.location.state.petid);
    console.log("running getOwnerById from componentDidMount");
    this.getOwnerById(this.props.location.state.ownerId);
  };

  handleInputChange = event => {
    console.log("handleInputChange for " + event.target.name + "  " + event.target.value);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("this.state is");
    console.log(JSON.stringify(this.state, null, 2) + "\n");
  };

  getOnePet = petId => {
    console.log("inside getOnePet function of CarePetView Page")
    console.log(petId);

    API.getOnePet(petId)
      .then(res =>
        //        console.log(res)
        this.setState(
          { pet: res.data },
          console.log("pet res.data in Carepetview.js ", res)
        )
      )
      .then(res => console.log("pet state ", this.state))
      .catch(err => console.log(err))
  };

  getOwnerById = ownerId => {
    console.log("inside getOwnerById function of CarePetView Page")
    console.log(ownerId);

    API.getOwnById(ownerId)
      .then(res =>
        //        console.log(res)
        this.setState(
          { owner: res.data },
          console.log("owner res.data in Carepetview.js ", res)
        )
      )
      .then(res => console.log("owner state ", this.state))
      .catch(err => console.log(err))
  };

  cgPage = (cgId, username) => {
    console.log("petview.js ownerPage ownerId ", cgId)
    console.log("petview.js ownerPage state pet owner_id ", this.state.pet.owner_id)
    this.props.history.push("/caregiverview/", { cgId: cgId, pathName: "/caregiverpetview/", username: username })
  };


  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">Caregiver Pet View </div>
        {this.state.owner.length ? (
          <div className="container mt-5">
            <div className="row">
              <p>Owner name: {this.state.owner[0].name}</p>   
            </div>
          </div>
        ) : (
            <p>Owner not found</p>
          )}
      </div>

    );
  }
}
export default CarePetView;