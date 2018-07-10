import React, { Component } from "react";
import Jumbotron2 from "../../components/Jumbotron2";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { OwnerLoginBtn, CareLoginBtn } from "../../components/Buttons";
import { Input } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import Footer from "../../components/Footer";
import "./Login.css";


class Login extends Component {
  state = {
    ownerUserName: "",
    ownerPassword: "",
    careUserName: "",
    carePassword: "",
    user: {}
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

      const userName = this.state.ownerUserName
      console.log("userName is " + userName);

      API.getOwnLogin(userName)
        .then(res =>
          //        console.log(res.data)
          this.setState(
            { user: res.data[0] },
            () => console.log("user state ", this.state)
          )
        )
        .then(res => {
          console.log("user password is " + this.state.user.password)
          console.log("logon password is " + this.state.ownerPassword)

          if (this.state.user.password === this.state.ownerPassword) {
            console.log("user password matches login password")
            this.props.history.push("/ownerview/", { username: this.state.ownerUserName, fromPage: "LoginOwner" })
          }
          else {
            console.log("user password DOES NOT MATCH login password")
          }
        })
//      .then(res => this.hasPets(this.props.location.state))
        .catch(err => console.log(err)
      );
    }
  };

  careFormSubmit = event => {
    event.preventDefault();

    if (this.state.careUserName && this.state.carePassword) {

      const userName = this.state.careUserName
      console.log("userName is " + userName);

      API.getCareLogin(userName)
        .then(res =>
          //        console.log(res.data)
          this.setState(
            { user: res.data[0] },
            () => console.log("user state ", this.state)
          )
        )
        .then(res => {
          console.log("user password is " + this.state.user.password)
          console.log("logon password is " + this.state.carePassword)

          if (this.state.user.password === this.state.carePassword) {
            console.log("user password matches login password")
            this.props.history.push("/caregiverview/", { username: this.state.careUserName, fromPage: "LoginCaregiver" })
          }
          else {
            console.log("user password DOES NOT MATCH login password")
          }
        })
//      .then(res => this.hasPets(this.props.location.state))
        .catch(err => console.log(err)
      );  
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
                  <form>
                    <Input
                      value={this.state.ownerUserName}
                      onChange={this.handleInputChange}
                      name="ownerUserName"
                      title="Owner User Name"
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
                  <form>
                    <Input
                      value={this.state.careUserName}
                      onChange={this.handleInputChange}
                      name="careUserName"
                      title="Care Giver User Name"
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