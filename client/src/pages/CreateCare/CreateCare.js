import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { CreateBtn } from "../../components/Buttons";
import Footer from "../../components/Footer";
import { Input, InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import Image from "react-image-resizer";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle, CardFooter, CardImg, CardSubtitle, CardText } from "reactstrap";
import "./CreateCare.css";

class CreateCare extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal7: false,
      careGiver: {},
      image: "",
      isUploading: false,
      progress: 0,
      imageURL: "",
      errorMsg: ""
    };

    this.toggle7 = this.toggle7.bind(this);
  }

  toggle7() {
    this.setState({
      modal7: !this.state.modal7
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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
      .ref("caregiver")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({ imageURL: url })
      );
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
      "caregiver_image": this.state.imageURL
    };

    API.createCaregiver({ newCareGiver })
      .then(res => this.props.history.push("/caregiverview/", { username: this.state.careUsername, fromPage: "CreateCare" }))
      .catch(err => console.log(err));
  };

  userFormSubmit = event => {
    event.preventDefault();
    let allRequired = false;

    if (!this.state.careUsername) {
      allRequired = false;
      this.setState({
        errorMsg: "User Name"
      })
    } else if (!this.state.carePassword) {
      allRequired = false;
      this.setState({
        errorMsg: "Password"
      })
    } else if (!this.state.careName) {
      allRequired = false;
      this.setState({
        errorMsg: "Name"
      })
      } else if (!this.state.careAddress) {
        allRequired = false;
        this.setState({
          errorMsg: "Address"
        })
      } else if (!this.state.careCity) {
        allRequired = false;
        this.setState({
          errorMsg: "City"
        })
      } else if (!this.state.careState) {
        allRequired = false;
        this.setState({
          errorMsg: "State"
        })
      } else if (!this.state.careZipcode) {
        allRequired = false;
        this.setState({
          errorMsg: "Zip Code"
        })
      } else if (!this.state.carePhone) {
        allRequired = false;
        this.setState({
          errorMsg: "Phone"
        })
      } else {
        allRequired = true;
      }

    if (allRequired){
    if (this.state.careUsername && this.state.carePassword) {

      const careLogObj = {
        username: this.state.careUsername,
        password: this.state.carePassword,
        role: "caregiver"
      }

      API.createCareLogin({ careLogObj })
        .then(res => this.careFormSubmit(event)
        )
        .catch(err => console.log(err));
    }  
    } else {
      this.toggle7();
      console.log("error array", this.state.errorMsg);
  }
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
                <CardHead> <div className="create2"><i className="fas fa-paw"></i> Create Caregiver Account <span className="required">* = required field</span></div></CardHead>
                <div className="background">
                  <CardBody>
                    <form>
                      <InputRow
                        value={this.state.careUsername}
                        onChange={this.handleInputChange}
                        name="careUsername"
                        title="User Name: *"
                        forattribute="careId"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                      <InputRow
                        value={this.state.carePassword}
                        onChange={this.handleInputChange}
                        name="carePassword"
                        title="Password: *"
                        forattribute="carePsswrd"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                      <InputRow
                        value={this.state.careName}
                        onChange={this.handleInputChange}
                        name="careName"
                        title="Name: *"
                        forattribute="careNm"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                      <InputRow
                        value={this.state.careAddress}
                        onChange={this.handleInputChange}
                        name="careAddress"
                        title="Address: *"
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
                            title="City: *"
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
                            title="State: *"
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
                            title="Zip: *"
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
                            title="Phone: *"
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
                                storageRef={firebase.storage().ref("caregiver")}
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
                      <TextArea
                        value={this.state.careAbout}
                        onChange={this.handleInputChange}
                        name="careAbout"
                        title="About Me"
                        forattribute="careAbt"
                      />
                      <CreateBtn
                        // need to change function to this.careFormSubmit when we use authentication
                        onClick={this.userFormSubmit}
                      >Create Account
                      </CreateBtn>
                    </form>
                  </CardBody>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />

        <Modal isOpen={this.state.modal7} toggle={this.toggle7} className={this.props.className} size="lg" backdrop="static" >
          <ModalHeader toggle={this.toggle7}><div className="account">Error Message</div></ModalHeader>
          <ModalBody>
            <div className="card">

              <CardHead
                value="Error Message"
              />
              <CardBody>
                <div className="row">
                  <div className="col">
                    <p className="error-msg">Please enter a valid {this.state.errorMsg}.</p>
                  </div>
                </div>
                <Button className="modal-btn" onClick={this.toggle7}>Close</Button>
              </CardBody>
            </div>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}

export default CreateCare;