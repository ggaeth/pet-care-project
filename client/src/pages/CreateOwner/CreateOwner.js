import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { OwnerLoginBtn, CareLoginBtn, CreateBtn } from "../../components/Buttons";
import { Input, InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import "./CreateOwner.css";

class CreateOwner extends Component {
  // state = {
  //   ownerUsername: "",
  //   ownerPassword: "",
  //   ownerName: "",
  //   ownerAddress: "",
  //   ownerCity: "",
  //   ownerState: "",
  //   ownerZipcode: "",
  //   ownerPhone: "",
  //   ownerSecPhone: "",
  //   ownerEmail: "",
  //   ownerInfo: "",
  //   ownerImgFile: ""
  // };

  state = {
    petOwner: {},
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


  handleFormSubmit = event => {
    event.preventDefault();

    const newOwner = {
      "name": this.state.ownerName,
      "address": this.state.ownerAddress,
      "city": this.state.ownerCity,
      "state": this.state.ownerState,
      "zip_code": this.state.ownerZipcode,
      "phone": this.state.ownerPhone,
      "secondary_phone": this.state.ownerSecPhone,
      "email": this.state.ownerEmail,
      "username": this.state.ownerUsername,
      "owner_info": this.state.ownerInfo,
      "owner_image": this.state.ownerImgFile
    };
    console.log("newOwner object that will be sent to server: ");
    console.log(JSON.stringify(newOwner, null, 2) + "\n");

    API.createOwner({ newOwner })
      .then(res => this.props.history.push("/owner/", this.state.ownerUsername))
      .catch(err => console.log(err));

//    console.log("newOwner object that will be sent to server: ");
//    console.log(JSON.stringify(newOwner, null, 2) + "\n");
  };

  ownerIdFormSubmit = event => {
    event.preventDefault();

      API.createOwner({
        user: this.state.ownerUserid,
        password: this.state.ownerPassword
      })
        .then(res => this.createdOwner())
        .catch(err => console.log(err));

  };

  careFormSubmit = event => {
    event.preventDefault();
    if (this.state.careUserid && this.state.carePassword) {
      API.ownerLogin({
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
            <h1>Create New Account - Pet Owner</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <CardBody>
                <form>
                  <InputRow
                    value={this.state.ownerUsername}
                    onChange={this.handleInputChange}
                    name="ownerUsername"
                    title="User Name:"
                    forattribute="ownerId"
                    collabel="col-md-2"
                    coldiv="col-md-10"
                  />
                  <InputRow
                    value={this.state.ownerPassword}
                    onChange={this.handleInputChange}
                    name="ownerPassword"
                    title="Password:"
                    forattribute="ownerPsswrd"
                    collabel="col-md-2"
                    coldiv="col-md-10"
                  />
                  <InputRow
                    value={this.state.ownerName}
                    onChange={this.handleInputChange}
                    name="ownerName"
                    title="Name:"
                    forattribute="ownerNm"
                    collabel="col-md-2"
                    coldiv="col-md-10"
                  />
                  <InputRow
                    value={this.state.ownerAddress}
                    onChange={this.handleInputChange}
                    name="ownerAddress"
                    title="Address:"
                    forattribute="ownerAdd"
                    collabel="col-md-2"
                    coldiv="col-md-10"
                  />
                  <div className="row">
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.ownerCity}
                        onChange={this.handleInputChange}
                        name="ownerCity"
                        title="City:"
                        forattribute="ownerCty"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                  </div>
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.ownerState}
                        onChange={this.handleInputChange}
                        name="ownerState"
                        title="State:"
                        forattribute="ownerState"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                  </div>
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.ownerZipcode}
                        onChange={this.handleInputChange}
                        name="ownerZipcode"
                        title="Zip:"
                        forattribute="ownerZp"
                        collabel="col-md-3"
                        coldiv="col-md-9"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                    <InputRow
                        value={this.state.ownerPhone}
                        onChange={this.handleInputChange}
                        name="ownerPhone"
                        title="Phone:"
                        forattribute="ownerPh"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.ownerSecPhone}
                        onChange={this.handleInputChange}
                        name="ownerSecPhone"
                        title="Secondary Phone:"
                        forattribute="ownerPh2"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                    <InputRow
                        value={this.state.ownerEmail}
                        onChange={this.handleInputChange}
                        name="ownerEmail"
                        title="Email:"
                        forattribute="ownerEml"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-6">
                  <InputRow
                    value={this.state.ownerImgFile}
                    onChange={this.handleInputChange}
                    name="ownerImgFile"
                    title="Image:"
                    forattribute="ownerImg"
                    collabel="col-md-4"
                    coldiv="col-md-8"
                  />
                  </div>
                  </div>
                  <TextArea
                    value={this.state.ownerInfo}
                    onChange={this.handleInputChange}
                    name="ownerInfo"
                    title="About Me"
                    forattribute="ownerAbt"
                  />
                  <CreateBtn
                    onClick={this.handleFormSubmit}
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

export default CreateOwner;