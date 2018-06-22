import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./CreateOwner.css";

class CreateOwner extends Component {
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
      "name": this.state.name,
      "address": this.state.address,
      "city": this.state.city,
      "state": this.state.state,
      "zip_code": this.state.zip_code,
      "phone": this.state.phone,
      "secondary_phone": this.state.secondary_phone,
      "email": this.state.email,
      "username": this.state.username,
      "owner_info": this.state.owner_info,
      "owner_image": this.state.owner_image
    };
    console.log("newOwner object that will be sent to server: ");
    console.log(JSON.stringify(newOwner, null, 2) + "\n");

    API.createOwner({ newOwner })
      .then(res => console.log(res))
      .catch(err => console.log(err));

//    console.log("newOwner object that will be sent to server: ");
//    console.log(JSON.stringify(newOwner, null, 2) + "\n");
  };

  //   NEW OWNER CREATE BUTTON  
  // $(".create-owner").on("submit", function(event) {
  //   event.preventDefault();
  //   alert("you clicked new owner create button");

  //   var newOwner = {
  //     name: $("#owner-name").val().trim(),
  //     address: $("#owner-address").val().trim(),
  //     city: $("#owner-city").val().trim(),
  //     state: $("#owner-state").val().trim(),
  //     zip_code: $("#owner-zipcode").val(),
  //     phone: $("#owner-phone").val().trim(),
  //     secondary_phone: $("#owner-sec-phone").val().trim(),
  //     email: $("#owner-email").val().trim(),
  //     username: $("#owner-username").val().trim(),
  //     owner_info: $("#owner-info").val(),
  //     owner_image: $("#owner-img-file").val()
  //   };

  //   console.log("JSON that was sent to server");
  //   console.log(JSON.stringify(newOwner, null, 2) + "\n");

  //   $.ajax("/api/owners", {
  //     type: "POST",
  //     data: newOwner
  //   }).then(function (result) {
  // if entered customer does not exist, insert entered burger and entered new customer. 
  //     console.log("JSON that was received from server");
  //     console.log(JSON.stringify(result, null, 2) + "\n");
  //   });
  //});


  render() {
    return (
      <div>
        <Container fluid>
          <h3 className="text-center mt-5">
            Create Owner Test
          </h3>
          <Row>
            <Container>
              <Col size="col-6">
                <form className="create-owner">
                  <div className="form-group">
                    <label htmlFor="owner-name">Name</label>
                    <Input
                      value={this.state.ownerName}
                      onChange={this.handleInputChange}
                      name="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-address">Address</label>
                    <Input
                      value={this.state.ownerAddress}
                      onChange={this.handleInputChange}
                      name="address"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-city">City</label>
                    <Input
                      value={this.state.ownerCity}
                      onChange={this.handleInputChange}
                      name="city"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-state">State</label>
                    <Input
                      value={this.state.ownerState}
                      onChange={this.handleInputChange}
                      name="state"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-zipcode">Zip</label>
                    <Input
                      value={this.state.ownerZipcode}
                      onChange={this.handleInputChange}
                      name="zip_code"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-phone">Phone Number</label>
                    <Input
                      value={this.state.ownerPhone}
                      onChange={this.handleInputChange}
                      name="phone"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-sec-phone">Secondary Phone Number</label>
                    <Input
                      value={this.state.ownerSecPhone}
                      onChange={this.handleInputChange}
                      name="secondary_phone"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-email">Email address</label>
                    <Input
                      value={this.state.ownerEmail}
                      onChange={this.handleInputChange}
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-username">PetPurfect User Name</label>
                    <Input
                      value={this.state.ownerUsername}
                      onChange={this.handleInputChange}
                      name="username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-info">Owner Info</label>
                    <TextArea rows="3"
                      value={this.state.ownerInfo}
                      onChange={this.handleInputChange}
                      name="owner_info"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="owner-img-file">Your Photo</label>
                    <Input
                      value={this.state.ownerImgFile}
                      onChange={this.handleInputChange}
                      name="owner_image"
                    />
                  </div>
                  <FormBtn onClick={this.handleFormSubmit}>Submit</FormBtn>
                </form>
              </Col>
            </Container>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CreateOwner;