import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { OwnerLoginBtn, CareLoginBtn } from "../../components/Buttons";
import { Input } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import "./Login.css";

class Login extends Component {
  state = {
    ownerUserid: "",
    ownerPassword: "",
    careUserid: "",
    carePassword: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  ownerFormSubmit = event => {
    event.preventDefault();
    if (this.state.ownerUserid && this.state.ownerPassword) {
      API.ownerLogin({
        user: this.state.ownerUserid,
        password: this.state.ownerPassword
      })
        .then(res => this.ownerLoggedIn())
        .catch(err => console.log(err));
    }
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
          <div className="col">
            <Jumbotron>
              <p>Login Page</p>
            </Jumbotron>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <CardHead
                value="Pet Owner Login"
              />
              <CardBody>
                <form>
                    <Input
                      value={this.state.ownerUserid}
                      onChange={this.handleInputChange}
                      name="ownerUserid"
                      title="Owner User ID"
                      for="ownerId"
                    />
                    <Input
                      value={this.state.ownerPassword}
                      onChange={this.handleInputChange}
                      name="ownerPassword"
                      title="Owner Password"
                      for="ownerPsswrd"
                    />
                    <OwnerLoginBtn
                      disabled={!(this.state.ownerUserid && this.state.ownerPassword)}
                      onClick={this.ownerFormSubmit}
                    >
                      Owner Login
                    </OwnerLoginBtn>
                </form>
              </CardBody>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <CardHead
                value="Care Giver Login"
              />
              <CardBody>
              <form>
                  <Input
                    value={this.state.careUserid}
                    onChange={this.handleInputChange}
                    name="careUserid"
                    title="Care Giver User ID"
                    for="careId"
                  />
                  <Input
                    value={this.state.carePassword}
                    onChange={this.handleInputChange}
                    name="carePassword"
                    title="Care Giver Password"
                    for="carePsswrd"
                  />
                  <CareLoginBtn
                    disabled={!(this.state.careUserid && this.state.carePassword)}
                    onClick={this.careFormSubmit}
                  >
                    Care Giver Login
                  </CareLoginBtn>
                </form>
              </CardBody>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;