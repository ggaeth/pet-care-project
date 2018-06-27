import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { AddBtn, DeleteBtn} from "../../components/Buttons";
import { Input, InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import "./PetView.css";

class CreateToDo extends Component {
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

        const newToDo = {
            "Time": this.state.petName,
            "ToDo": this.state.petAge,
            
        };
        console.log("newToDo object that will be sent to server: ");
        console.log(JSON.stringify(newToDo, null, 2) + "\n");

        // API.createPet({ newPet})
        //   .then(res => this.props.history.push("/owner/", this.state.ownerUsername))
        //   .catch(err => console.log(err));

        //    console.log("newOwner object that will be sent to server: ");
        //    console.log(JSON.stringify(newOwner, null, 2) + "\n");
    };



    //   careFormSubmit = event => {
    //     event.preventDefault();
    //     if (this.state.careUserid && this.state.carePassword) {
    //       API.ownerLogin({
    //         user: this.state.careUserid,
    //         password: this.state.carePassword
    //       })
    //         .then(res => this.careLoggedIn())
    //         .catch(err => console.log(err));
    //     }
    //   };

    render() {
        return (
            <div className="container fluid">
                <div className="row">
                <div className="col-md-6">
            
                    <div className="col-md-6 text-center">
                        
                    </div>

                </div>
            
            <div className="row">
                <div className="col">
                    <div className="card">
                        <CardBody>
                            <form>
                            <div className="row">
                                    <div className="col-md-3">
                                        <InputRow
                                            value={this.state.timeToDo}
                                            onChange={this.handleInputChange}
                                            name="timeToDo"
                                            placeholder="Time:"
                                            forattribute="timeToDo"
                                            coldiv="col-md-12"
                                        />
                                    </div>
                                    <div className="col-md-7">
                                        <InputRow
                                            value={this.state.ToDo}
                                            onChange={this.handleInputChange}
                                            name="ToDo"
                                            placeholder="To Do:"
                                            forattribute="ToDo"
                                            coldiv="col-md-12"
                                        />
                                    </div>
                            
                                
                                    <AddBtn
                                    onClick={this.handleFormSubmit}
                                >
                                    Add
                  </AddBtn>
                  <DeleteBtn
                                    onClick={this.handleFormSubmit}
                                >
                                    Delete
                  </DeleteBtn>
                  </div>
                            </form>
                        </CardBody>
                    </div>
                </div>
            </div>
            </div>
          </div>
     
     
    );
    }
}

export default CreateToDo;