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

        const newPet = {
            "name": this.state.petName,
            "age": this.state.petAge,
            "breed": this.state.petBreed,
            "gender": this.state.petGender,
            "pet_image": this.state.petImage,
            "crate": this.state.petCrate,
            "vet_name": this.state.petVetName,
            "vet_phone": this.state.petVetPhone,
            "vet_location": this.state.petVetLocation,
            "medications": this.state.petMedications,
            "restrictions": this.state.petRestrictions
        };
        console.log("newOwner object that will be sent to server: ");
        console.log(JSON.stringify(newPet, null, 2) + "\n");

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
                                    value={this.state.petName}
                                    onChange={this.handleInputChange}
                                    name="petName"
                                    title="Name:"
                                    forattribute="petNm"
                                    collabel="col-md-2"
                                    coldiv="col-md-6"
                                />
                                <InputRow
                                    value={this.state.ownerAddress}
                                    onChange={this.handleInputChange}
                                    name="petAge"
                                    title="Age:"
                                    forattribute="petAge"
                                    collabel="col-md-2"
                                    coldiv="col-md-2"
                                />
                                <div className="row">
                                    <div className="col-md-6">
                                        <InputRow
                                            value={this.state.ownerCity}
                                            onChange={this.handleInputChange}
                                            name="petBreed"
                                            title="Breed:"
                                            forattribute="petBreed"
                                            collabel="col-md-4"
                                            coldiv="col-md-8"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputRow
                                            value={this.state.ownerState}
                                            onChange={this.handleInputChange}
                                            name="petGender"
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
                                            value={this.state.ownerCity}
                                            onChange={this.handleInputChange}
                                            name="petCrate"
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
                                            value={this.state.ownerPhone}
                                            onChange={this.handleInputChange}
                                            name="petVetName"
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
                                            value={this.state.ownerSecPhone}
                                            onChange={this.handleInputChange}
                                            name="petVetPhone"
                                            title="Vet Phone:"
                                            forattribute="petVetPhone"
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
                                            name="petVetAddress"
                                            title="Vet Address:"
                                            forattribute="petVetAdd"
                                            collabel="col-md-4"
                                            coldiv="col-md-8"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <InputRow
                                            value={this.state.ownerImgFile}
                                            onChange={this.handleInputChange}
                                            name="petImgFile"
                                            title="Image:"
                                            forattribute="petImg"
                                            collabel="col-md-4"
                                            coldiv="col-md-8"
                                        />
                                    </div>
                                </div>
                                <TextArea
                                    value={this.state.ownerInfo}
                                    onChange={this.handleInputChange}
                                    name="petMedications"
                                    title="Medications"
                                    forattribute="petMeds"
                                />
                                <TextArea
                                    value={this.state.ownerInfo}
                                    onChange={this.handleInputChange}
                                    name="petRestrictions"
                                    title="Retrictions"
                                    forattribute="petRetict"
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

export default CreatePet;