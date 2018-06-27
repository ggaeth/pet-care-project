import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { OwnerLoginBtn, CareLoginBtn, CreateBtn } from "../../components/Buttons";
import { Input, InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import "./CreatePet.css";

class CreatePet extends Component {

  state = {
    passedOwnerId: "",
    ownerUsername: "",
    petOwner: {}
  };

  // componentDidMount() {
  //   console.log("in mount CreatePet state ", this.props.location.state);
  //   console.log("in mount CreatePet id ", this.props.location.state.id);
  //   console.log("in mount CreatePet username ", this.props.location.state.username);
  //   this.setState({ passedOwnerId: this.props.location.state.id, ownerUserName: this.props.location.state.username })
  // };

  handleInputChange = event => {
    // console.log("handleInputChange for " + event.target.name + "  " + event.target.value);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    // console.log("this.state is");
    // console.log(JSON.stringify(this.state, null, 2) + "\n");
  };


  createPet = event => {
    event.preventDefault();

    const newPet = {
      "owner_id": this.state.passedOwnerId,
      "name": this.state.name,
      "age": this.state.age,
      "breed": this.state.breed,
      "gender": this.state.gender,
      "crate": this.state.crate,
      "vet_name": this.state.vet_name,
      "vet_address": this.state.vet_address,
      "vet_city": this.state.vet_city,
      "vet_state": this.state.vet_state,
      "vet_zip_code": this.state.vet_zip_code,
      "vet_phone": this.state.vet_phone,
      "pet_medications": this.state.pet_medications,
      "pet_restrictions": this.state.pet_restrictions,
      "pet_image": this.state.pet_image
    };
    console.log("newOwner object that will be sent to server: ");
    console.log(JSON.stringify(newPet, null, 2) + "\n");

    API.createPet({ newPet })
      //   .then(res => console.log("res ", res), this.props.history.push("/ownerview/", { username: this.state.ownerUsername, petId: this.res.data }))
      .then(res => console.log("res ", res))
      .catch(err => console.log(err));

    console.log("newOwner object that will be sent to server: ");
    console.log(JSON.stringify(newPet, null, 2) + "\n");
  };

  render() {
    return (
      <div className="container fluid">
        <div className="row">
          <div className="col text-center">
            <h1>Create New Pet</h1>
          </div>

        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <CardBody>
                <form>
                  <InputRow
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                    title="Name:"
                    forattribute="petNm"
                    collabel="col-md-2"
                    coldiv="col-md-6"
                  />
                  <InputRow
                    value={this.state.age}
                    onChange={this.handleInputChange}
                    name="age"
                    title="Age:"
                    forattribute="petAge"
                    collabel="col-md-2"
                    coldiv="col-md-2"
                  />
                  <div className="row">
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.breed}
                        onChange={this.handleInputChange}
                        name="breed"
                        title="Breed:"
                        forattribute="petBreed"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.gender}
                        onChange={this.handleInputChange}
                        name="gender"
                        title="Gender:"
                        forattribute="petGender"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.crate}
                        onChange={this.handleInputChange}
                        name="crate"
                        title="Crate Trained:"
                        forattribute="petCrate"
                        collabel="col-md-4"
                        coldiv="col-md-3"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.vet_name}
                        onChange={this.handleInputChange}
                        name="vet_name"
                        title="Vet Name:"
                        forattribute="petVetNm"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.vet_phone}
                        onChange={this.handleInputChange}
                        name="vet_phone"
                        title="Vet Phone:"
                        forattribute="petVetPhone"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <InputRow
                        value={this.state.vet_address}
                        onChange={this.handleInputChange}
                        name="vet_address"
                        title="Vet Address:"
                        forattribute="petVetAdd"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.vet_city}
                        onChange={this.handleInputChange}
                        name="vet_city"
                        title="Vet City:"
                        forattribute="vetCty"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.vet_state}
                        onChange={this.handleInputChange}
                        name="vet_state"
                        title="Vet State:"
                        forattribute="vetState"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.vet_zip_code}
                        onChange={this.handleInputChange}
                        name="vet_zip_code"
                        title="Vet Zip:"
                        forattribute="vetZp"
                        collabel="col-md-3"
                        coldiv="col-md-9"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <InputRow
                        value={this.state.pet_image}
                        onChange={this.handleInputChange}
                        name="pet_image"
                        title="Image:"
                        forattribute="petImg"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                    </div>
                  </div>
                  <TextArea
                    value={this.state.pet_medications}
                    onChange={this.handleInputChange}
                    name="pet_medications"
                    title="Medications"
                    forattribute="petMeds"
                  />
                  <TextArea
                    value={this.state.pet_restrictions}
                    onChange={this.handleInputChange}
                    name="pet_restrictions"
                    title="Retrictions"
                    forattribute="petRetict"
                  />
                  <CreateBtn
                    onClick={this.createPet}
                  >
                    Add New Pet
                  </CreateBtn>
                </form>
              </CardBody>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default CreatePet;