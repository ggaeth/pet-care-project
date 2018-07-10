import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { OwnerLoginBtn, CareLoginBtn, CreateBtn } from "../../components/Buttons";
import { Input, InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import Image from "react-image-resizer";
import "./CreatePet.css";

class CreatePet extends Component {

  state = {
    passedOwnerId: "",
    ownerUsername: "",
    petOwner: {},
    pets: [],
    image: "",
    isUploading: false,
    progress: 0,
    imageURL: ""
  };

  componentDidMount() {
    console.log("in mount CreatePet state ", this.props.location.state);
    console.log("in mount CreatePet id ", this.props.location.state.id);
    console.log("in mount CreatePet username ", this.props.location.state.username);
    this.setState({ passedOwnerId: this.props.location.state.id, ownerUsername: this.props.location.state.username })
  };

  handleInputChange = event => {
    // console.log("handleInputChange for " + event.target.name + "  " + event.target.value);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    // console.log("this.state is");
    // console.log(JSON.stringify(this.state, null, 2) + "\n");
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ image: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("pet")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({ imageURL: url })
      );
  };

  createPet = event => {
    event.preventDefault();

    const newPet = {
      "owner_id": this.state.passedOwnerId,
      "name": this.state.name,
      "age": this.state.age,
      "breed": this.state.breed,
      "gender": this.state.gender,
      "crate": this.state.crate,
      "care_location": this.state.care_location,
      "vet_name": this.state.vet_name,
      "vet_address": this.state.vet_address,
      "vet_city": this.state.vet_city,
      "vet_state": this.state.vet_state,
      "vet_zip_code": this.state.vet_zip_code,
      "vet_phone": this.state.vet_phone,
      "pet_medications": this.state.pet_medications,
      "pet_restrictions": this.state.pet_restrictions,
      "pet_image": this.state.imageURL,
      "fk_owner_id": this.state.passedOwnerId
    };
    console.log("newPet object that will be sent to server: ");
    console.log(JSON.stringify(newPet, null, 2) + "\n");

    API.createPet({ newPet })
      .then(res => console.log("res ", res), this.props.history.push("/ownerview/", { username: this.state.ownerUsername, ownerid: this.state.passedOwnerId, fromPage: "CreatePet" }))
      // .then(res => console.log("res ", res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="background">
      <div className="container fluid">
        <div className="row">
          <div className="col text-center">
          <Jumbotron>
           <div className="caregiver"><i className="fas fa-paw"></i> Create New Pet</div>
          
          </Jumbotron>
           
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card ">
              <CardHead> <div className="create2"><i className="fas fa-paw"></i>Create New Pet</div></CardHead>
              <div className="background">
                <CardBody>
                  <form>
                    <InputRow
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      name="name"
                      title="Name:"
                      forattribute="petNm"
                      collable="col-md-2"
                      coldiv="col-md-6"
                    />
                    <InputRow
                      value={this.state.age}
                      onChange={this.handleInputChange}
                      name="age"
                      title="Age:"
                      forattribute="petAge"
                      collabel="col-md-2"
                      coldiv="col-md-2"
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <InputRow
                          value={this.state.breed}
                          onChange={this.handleInputChange}
                          name="breed"
                          title="Breed:"
                          forattribute="petBreed"
                          collabel="col-md-2"
                          coldiv="col-md-10"
                        />
                      </div>
                      {/* <div className="row"> */}
                      <div className="col-md-4">
                        <label className="form-check-label col-md-4" htmlFor="gender-radio">Gender:</label>
                        <div className="form-check form-check-inline" id="gender-radio">
                          <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="M" checked={this.state.gender === "M"} onChange={this.handleInputChange} />
                          <label className="form-check-label" htmlFor="inlineRadio1">M</label>
                        </div>
                        <div className="form-check form-check-inline" id="gender-radio">
                          <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="F" checked={this.state.gender === "F"} onChange={this.handleInputChange} />
                          <label className="form-check-label" htmlFor="inlineRadio2">F</label>
                        </div>
                      </div>
                    <div></div>
                    </div>
                    <div className="row">
                      <div className="crate col-md-6">
                        <label className="form-check-label col-md-4" htmlFor="crate-radio">Use Crate:</label>
                        <div className="form-check form-check-inline" id="create-radio">
                          <input className="form-check-input" type="radio" name="crate" id="inlineRadio3" value="yes" checked={this.state.crate === "yes"} onChange={this.handleInputChange} />
                          <label className="form-check-label" htmlFor="inlineRadio3">Yes</label>
                        </div>
                        <div className="form-check form-check-inline" id="create-radio">
                          <input className="form-check-input" type="radio" name="crate" id="inlineRadio4" value="no" checked={this.state.crate === "no"} onChange={this.handleInputChange} />
                          <label className="form-check-label" htmlFor="inlineRadio4">No</label>
                        </div>
                      </div>
                    {/* </div> */}
                    {/* <div className="row"> */}
                      <div className="col-md-6">
                        <label className="form-check-label col-md-6" htmlFor="location-radio">Location for Care:</label>
                        <div className="form-check form-check-inline" id="location-radio">
                          <input className="form-check-input" type="radio" name="care_location" id="inlineRadio5" value="in home" checked={this.state.care_location === "in home"} onChange={this.handleInputChange} />
                          <label className="form-check-label" htmlFor="inlineRadio5"> In Home</label>
                        </div>
                        <div className="form-check form-check-inline" id="location-radio">
                          <input className="form-check-input" type="radio" name="care_location" id="inlineRadio6" value="boarding" checked={this.state.care_location === "boarding"} onChange={this.handleInputChange} />
                          <label className="form-check-label" htmlFor="inlineRadio6">Boarding</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <InputRow
                          value={this.state.vet_name}
                          onChange={this.handleInputChange}
                          name="vet_name"
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
                          value={this.state.vet_phone}
                          onChange={this.handleInputChange}
                          name="vet_phone"
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
                          value={this.state.vet_address}
                          onChange={this.handleInputChange}
                          name="vet_address"
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
                          value={this.state.vet_city}
                          onChange={this.handleInputChange}
                          name="vet_city"
                          title="Vet City:"
                          forattribute="vetCty"
                          collabel="col-md-4"
                          coldiv="col-md-8"
                        />
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-md-6">
                        <InputRow
                          value={this.state.vet_state}
                          onChange={this.handleInputChange}
                          name="vet_state"
                          title="Vet State:"
                          forattribute="vetState"
                          collabel="col-md-4"
                          coldiv="col-md-8"
                        />
                      </div>
                      <div className= "col-md-6">
                        <InputRow
                          value={this.state.vet_zip_code}
                          onChange={this.handleInputChange}
                          name="vet_zip_code"
                          title="Vet Zip:"
                          forattribute="vetZp"
                          collabel="col-md-3"
                          coldiv="col-md-5"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-5">
                            <p>Upload your photo: </p>
                            <FileUploader
                              accept="image/*"
                              name="image"
                              randomizeFilename
                              storageRef={firebase.storage().ref("pet")}
                              onUploadStart={this.handleUploadStart}
                              onProgress={this.handleProgress}
                              onUploadError={this.handleUploadError}
                              onUploadSuccess={this.handleUploadSuccess}
                            />
                          </div>
                          <div className="col-md-3">
                            <p>Upload Progress:</p>
                          </div>
                          <div className="col-md-4">
                            <progress value={this.state.progress} max="100" id="uploader">0%</progress>
                            <Image
                              src={this.state.imageURL}
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <TextArea
                          value={this.state.pet_medications}
                          onChange={this.handleInputChange}
                          name="pet_medications"
                          title="Medications"
                          forattribute="petMeds"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <TextArea
                          value={this.state.pet_restrictions}
                          onChange={this.handleInputChange}
                          name="pet_restrictions"
                          title="Retrictions"
                          forattribute="petRetict"
                        />
                      </div>
                    </div>
                    <CreateBtn
                      onClick={this.createPet}>Add New Pet
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
   
export default CreatePet;