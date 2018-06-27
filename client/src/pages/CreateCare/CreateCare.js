import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { CreateBtn } from "../../components/Buttons";
import { Input, InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import "./CreateCare.css";

class CreateCare extends Component {
  state = {
    careGiver: {},
  };

  // componentDidMount() {
  //   console.log("in mount ", this.props.location.state);
  //   this.getHistory(this.props.location.state);
  // }

  // getHistory = id => {
  //   console.log(id);
  // }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  careFormSubmit = event => {
    event.preventDefault();

    const newCareGiver = {
      "name": this.state.ownerName,
      "address": this.state.ownerAddress,
      "city": this.state.ownerCity,
      "state": this.state.ownerState,
      "zip_code": this.state.ownerZipcode,
      "phone": this.state.ownerPhone,
      "secondary_phone": this.state.ownerSecPhone,
      "email": this.state.ownerEmail,
      "username": this.state.ownerUsername,
      "caregiver_info": this.state.ownerInfo,
      "caregiver_image": this.state.ownerImgFile
    };
    console.log("newOwner object that will be sent to server: ");
    console.log(JSON.stringify(newCareGiver, null, 2) + "\n");

    API.createOwner({ newCareGiver })
      .then(res => this.props.history.push("/caregiverview/", { username: this.state.CareGiverUsername, fromPage: "CreateCare" }))
      .catch(err => console.log(err));

    //    console.log("newOwner object that will be sent to server: ");
    //    console.log(JSON.stringify(newOwner, null, 2) + "\n");
  };
  
  careFormSubmit = event => {
    event.preventDefault();
    if (this.state.careUserid && this.state.carePassword) {
      API.careLogin({
        user: this.state.careUserid,
        password: this.state.carePassword
      })
        .then(res => this.careLoggedIn())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="container fluid">
        <div className="row">
          <div className="col text-center">
            <h1>Create New Account - Care Giver</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <CardBody>
                <form>
                  <InputRow
                    value={this.state.careUserid}
                    onChange={this.handleInputChange}
                    name="careUserid"
                    title="User ID:"
                    forattribute="careId"
                    collabel="col-md-2"
                    coldiv="col-md-10"
                  />
                  <InputRow
                    value={this.state.carePassword}
                    onChange={this.handleInputChange}
                    name="carePassword"
                    title="Password:"
                    forattribute="carePsswrd"
                    collabel="col-md-2"
                    coldiv="col-md-10"
                  />
                  <InputRow
                    value={this.state.careName}
                    onChange={this.handleInputChange}
                    name="careName"
                    title="Name:"
                    forattribute="careNm"
                    collabel="col-md-2"
                    coldiv="col-md-10"
                  />
                  <InputRow
                    value={this.state.careAddress}
                    onChange={this.handleInputChange}
                    name="careAddress"
                    title="Address:"
                    forattribute="careAdd"
                    collabel="col-md-2"
                    coldiv="col-md-10"
                  />
                  <div className="row">
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.careCity}
                        onChange={this.handleInputChange}
                        name="careCity"
                        title="City:"
                        forattribute="careCty"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.careSt}
                        onChange={this.handleInputChange}
                        name="careSt"
                        title="State:"
                        forattribute="careState"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.careZip}
                        onChange={this.handleInputChange}
                        name="careZip"
                        title="Zip:"
                        forattribute="careZp"
                        collabel="col-md-3"
                        coldiv="col-md-9"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.careEmail}
                        onChange={this.handleInputChange}
                        name="careEmail"
                        title="Email:"
                        forattribute="careEml"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.carePhone}
                        onChange={this.handleInputChange}
                        name="carePhone"
                        title="Phone:"
                        forattribute="carePh"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                    </div>
                  </div>
                  <InputRow
                    value={this.state.careImage}
                    onChange={this.handleInputChange}
                    name="careImage"
                    title="Image:"
                    forattribute="careImg"
                    collabel="col-md-2"
                    coldiv="col-md-10"
                  />
                  <TextArea
                    value={this.state.careAbout}
                    onChange={this.handleInputChange}
                    name="careAbout"
                    title="About Me"
                    forattribute="careAbt"
                  />
                  <CreateBtn
                    onClick={this.careFormSubmit}
                  >
                    Create Account
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

export default CreateCare;