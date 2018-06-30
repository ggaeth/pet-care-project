import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { CreateBtn } from "../../components/Buttons";
import Footer from "../../components/Footer";
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
      "name": this.state.careName,
      "address": this.state.careAddress,
      "city": this.state.careCity,
      "state": this.state.careState,
      "zip_code": this.state.careZipcode,
      "phone": this.state.carePhone,
      "secondary_phone": this.state.careSecPhone,
      "email": this.state.careEmail,
      "username": this.state.careUsername,
      "caregiver_info": this.state.careAbout,
      "caregiver_image": this.state.careImage
    };
    console.log("newOwner object that will be sent to server: ");
    console.log(JSON.stringify(newCareGiver, null, 2) + "\n");

    API.createCaregiver({ newCareGiver })
      .then(res => this.props.history.push("/caregiverview/", { username: this.state.careUsername, fromPage: "CreateCare" }))
      .catch(err => console.log(err));

    //    console.log("newOwner object that will be sent to server: ");
    //    console.log(JSON.stringify(newOwner, null, 2) + "\n");
  };
  
  userFormSubmit = event => {
    event.preventDefault();
      API.careLogin({
        user: this.state.careUsername,
        password: this.state.carePassword
      })
        .then(res => this.careFormSubmit())
        .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="background">
      <div className="container fluid">
        <div className="row">
          <div className="col text-center">
          <Jumbotron>
           <div className="caregiver"><i className="fas fa-paw"></i> Create Caregiver Account</div>
          
          </Jumbotron>
          </div>
        
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
            <CardHead> <div className="create2">Create Caregiver Account</div></CardHead>
            <div className="background">
              <CardBody>
                <form>
                  <InputRow
                    value={this.state.careUsername}
                    onChange={this.handleInputChange}
                    name="careUsername"
                    title="User Name:"
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
                        value={this.state.careState}
                        onChange={this.handleInputChange}
                        name="careState"
                        title="State:"
                        forattribute="careState"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.careZipcode}
                        onChange={this.handleInputChange}
                        name="careZipcode"
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
                        value={this.state.carePhone}
                        onChange={this.handleInputChange}
                        name="carePhone"
                        title="Phone:"
                        forattribute="carePh"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-6">
                      <InputRow
                        value={this.state.careSecPhone}
                        onChange={this.handleInputChange}
                        name="careSecPhone"
                        title="Secondary Phone:"
                        forattribute="carePh2"
                        collabel="col-md-4"
                        coldiv="col-md-8"
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
                    value={this.state.careImage}
                    onChange={this.handleInputChange}
                    name="careImage"
                    title="Image:"
                    forattribute="careImg"
                    collabel="col-md-4"
                    coldiv="col-md-8"
                  />
                  </div>
                  </div>
                  <TextArea
                    value={this.state.careAbout}
                    onChange={this.handleInputChange}
                    name="careAbout"
                    title="About Me"
                    forattribute="careAbt"
                  />
                  <CreateBtn
                  // need to change function to this.careFormSubmit when we use authentication
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
        </div>
        <Footer />
      </div>
    );
  }
}

export default CreateCare;