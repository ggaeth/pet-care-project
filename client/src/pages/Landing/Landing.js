import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { LoginBtn, CreateAcctBtn } from "../../components/Buttons";
import "./Landing.css";

class Landing extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="container fluid">
        <div className="row">
          <div className="col">
            <Jumbotron>
              <p>The Custom Pet Care (CPC) application gives pet owners the ability to provide custom 
                care information to caregivers about their pet while they are away. This information enhances 
                the care of their pets.  In addition, pet owners can specify special instructions for each pet 
                and coordinate with the caregiver to complete the status of very important tasks. If the 
                specified task has not completed with a specified time, the app can send a message to all 
                parties informing them that an important task is overdue.</p>
                <p>Caregivers can also benefit from this application by having a repository of information 
                  about each pet that is in their care. And, they can earn a good reputation from pet owners 
                  by following all care instructions. </p>
            </Jumbotron>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link to="/login" className="btn-link">
              <LoginBtn>
                Login
              </LoginBtn>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link to="/create" className="btn-link">
              <CreateAcctBtn>
                Create Account
              </CreateAcctBtn>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;