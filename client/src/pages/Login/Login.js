import React, { Component } from "react";
import Jumbotron2 from "../../components/Jumbotron2";
import axios from "axios";
import { Link } from "react-router-dom";
import { OwnerLoginBtn, CareLoginBtn } from "../../components/Buttons";
import { Input, InputPw } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import Footer from "../../components/Footer";
import "./Login.css";


class Login extends Component {
  state = {
    ownerUserName: "",
    ownerPassword: "",
    careUserName: "",
    carePassword: "",
    user: {},
    ownerAuthError: "N",
    careAuthError: "N",
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  ownerFormSubmit = event => {
    event.preventDefault();

    if (this.state.ownerUserName && this.state.ownerPassword) {

      const ownLogObj = {
        username: this.state.ownerUserName,
        password: this.state.ownerPassword,
      }

      let self = this;

      axios.post("/auth", ownLogObj)
        .then(res => {
          if (res.status === 200) {
            self.props.history.push("/ownerview/", { username: self.state.ownerUserName, fromPage: "LoginOwner" })
          }
        })
        .catch(err => {          
          console.log(err)
          this.setState(
            { ownerAuthError: "Y" })
        })
    }
  };

  careFormSubmit = event => {
    event.preventDefault();

    if (this.state.careUserName && this.state.carePassword) {

      const ownLogObj = {
        username: this.state.careUserName,
        password: this.state.carePassword,
      }

      let self = this;

      axios.post("/auth", ownLogObj)
        .then(res => {
          if (res.status === 200) {
            this.props.history.push("/caregiverview/", { username: this.state.careUserName, fromPage: "LoginCaregiver" })
          }
        })
        .catch(err => {
          console.log(err)
          this.setState(
            { careAuthError: "Y" })
        })
    }
  };

  render() {
    return (
      <div className="background">
        <div className="container fluid">
          <div className="row">
            <div className="col">
              <Jumbotron2>
                <h4> Please Login</h4>
                <div className="paw"> <i className="fas fa-paw"></i></div>
              </Jumbotron2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <CardHead>
                  <div className="login"><i className="fas fa-paw"></i>Pet Owner Login</div>
                </CardHead>
                <div className="background">
                  <CardBody>
                    {this.state.ownerAuthError === "Y" ? (
                      <p className="text-center font-weight-bold">Invalid user name or password !</p>
                      ) : (
                        <p></p>                           
                      )
                    }
                    <form>
                      <Input
                        value={this.state.ownerUserName}
                        onChange={this.handleInputChange}
                        name="ownerUserName"
                        title="Owner User Name"
                        for="ownerId"
                      />
                      <InputPw
                        value={this.state.ownerPassword}
                        onChange={this.handleInputChange}
                        name="ownerPassword"
                        title="Owner Password"
                        for="ownerPsswrd"
                      />
                      <OwnerLoginBtn
                        disabled={!(this.state.ownerUserName && this.state.ownerPassword)}
                        onClick={this.ownerFormSubmit}
                      >
                        Owner Login
                    </OwnerLoginBtn>
                    </form>
                  </CardBody>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <CardHead>
                  <div className="login"><i className="fas fa-paw"></i>Care Giver Login</div>
                </CardHead>
                <div className="background">
                  <CardBody>
                    {this.state.careAuthError === "Y" ? (
                      <p className="text-center font-weight-bold">Invalid user name or password !</p>
                      ) : (
                        <p></p>
                      )
                    }
                    <form>
                      <Input
                        value={this.state.careUserName}
                        onChange={this.handleInputChange}
                        name="careUserName"
                        title="Care Giver User Name"
                        for="careId"
                      />
                      <InputPw
                        value={this.state.carePassword}
                        onChange={this.handleInputChange}
                        name="carePassword"
                        title="Care Giver Password"
                        for="carePsswrd"
                      />
                      <CareLoginBtn
                        disabled={!(this.state.careUserName && this.state.carePassword)}
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
          <div className="space"></div>
        </div>
        <Footer />
      </div>

    );
  }
}

export default Login;