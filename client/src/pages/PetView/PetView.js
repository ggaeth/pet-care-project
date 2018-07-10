import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { AddBtn, DeleteBtn, TodoBtn, TodoDelBtn, CareBtn, PetViewBtn, OwnPetModalCloseBtn } from "../../components/Buttons";
import { Input, InputBox, InputRow, TextArea } from "../../components/Form";
import { CardHead } from "../../components/Card";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle, CardBody, CardFooter, CardImg, CardSubtitle, CardText } from "reactstrap";
import { Container } from "../../components/Grid";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import Image from "react-image-resizer";
import "./PetView.css";

class PetView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal2: false,
      overdue: false,
      image: "",
      isUploading: false,
      progress: 0,
      imageURL: "",
      pet: {},
      petTodos: [],
      caregivers: []
    };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle5 = this.toggle5.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggle5() {
    this.setState({
      modal5: !this.state.modal5
    });
  }

  toggle2() {
    console.log("inside toggle2 function of PetView Page")

    API.getAllCgs()
      .then(res =>
        this.setState(
          { caregivers: res.data },
          console.log("caregivers res.data in petview.js ", res)
        )
      )
      .then(res => console.log("caregivers state ", this.state.caregivers))
      .catch(err => console.log(err))

    this.setState({
      modal2: !this.state.modal2
    });
  };

  componentDidMount() {
    console.log("in mount PetView.js", this.props.location.state);
    console.log("running getOnePet from componentDidMount");
    this.getOnePet(this.props.location.state.petid);

    //    if (this.props.location.state.fromPage === "CreatePet") {
    //      console.log("location fromPage CreatePet");
    //      this.getPets(this.props.location.state.ownerid);
    //    }
    console.log("running getTodosByPetId from componentDidMount");
    this.getTodosByPetId(this.props.location.state.petid);
    this.loadCareGivers();
  };

  handleInputChange = event => {
    console.log("handleInputChange for " + event.target.name + "  " + event.target.value);
    console.log("this.state.pet.breed ", this.state.pet.breed);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("this.state is");
    console.log(JSON.stringify(this.state, null, 2) + "\n");
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
      .ref("owner")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({ imageURL: url })
      );
  };

  loadCareGivers = () => {
    API.getAllCgs()
      .then(res =>
        this.setState(
          { caregivers: res.data },
          console.log("caregivers res.data in petview.js ", res)
        )
      )
      .then(res => console.log("caregivers state ", this.state.caregivers))
      .catch(err => console.log(err))

  }

  getOnePet = petId => {
    console.log("inside getOnePet function of PetView Page")
    console.log(petId);

    API.getOnePet(petId)
      .then(res =>
        //        console.log(res)
        this.setState(
          { pet: res.data },
          console.log("pet res.data in petview.js ", res)
        )
      )
      .then(res => console.log("pet state ", this.state))
      .catch(err => console.log(err))
  };

  getTodosByPetId = petId => {
    console.log("inside getTodosByPetId function of PetView Page")
    console.log(petId);

    API.getTodosByPetId(petId)
      .then(res =>
        //          console.log(res)
        this.setState(
          { petTodos: res.data },
          console.log("petTodos state", this.state)
        )
      )
      //     .then(res => console.log("petTodos state ", this.state))
      .catch(err => console.log(err))
  };

  createTodoItem = event => {
    event.preventDefault();
    console.log("inside createTodoItem function in PetView.js");

    const petId = this.state.pet.pet_id;
    console.log("petOd is " + petId);

    const newTodo = {
      "pet_id": this.state.pet.pet_id,
      "name": this.state.pet.name,
      "todo_date": this.state.todoDate,
      "todo_time": this.state.todoTime,
      "todo_item": this.state.todoItem,
      // "todo_completed": this.state.todoCompleted,
      "todo_completed": "N",
      "fk_pet_id": this.state.pet.pet_id
    };
    console.log("newToDo object that will be sent to server: ");
    console.log(JSON.stringify(newTodo, null, 2) + "\n");

    API.createTodo({ newTodo })
      .then(res =>
        //        console.log(res)
        //        let newPetTodosArr = this.state.PetTodos.slice()
        //        newPetTodosArr.push(res)
        //        this.setState({petTodos: newPetTodosArr})
        //         this.setState(
        //          { petTodos: res.data },
        //          console.log("petTodos res.data in petview.js ", res)
        //        )
        this.getTodosByPetId(this.state.pet.pet_id)
      )
      
      //      this.props.history.push("/owner/", this.state.ownerUsername))
      .then(this.setState({
        todoDate: "",
        todoTime: "",
        todoItem: ""
  }))
      .catch(err => console.log(err)
      );
  };

  deleteTodo = event => {
    event.preventDefault();
    console.log("inside deleteTodo function of PetView Page")

    console.log("event.target.value is" + event.target.value);

    const petTodoId = event.target.value;
    console.log("petTodoId is " + petTodoId);

    API.deleteTodo(petTodoId)
      .then(res =>
        this.getTodosByPetId(this.state.pet.pet_id)
      )
      .catch(err => console.log(err))
  };

  updatePet = (event) => {
    event.preventDefault();
    console.log("inside updatePet function of PetView Page");

    const petId = this.state.pet.pet_id;
    console.log("petId is " + petId);

    const updatedPetObj = {
      "pet_id": this.state.pet.pet_id,
      "name": this.state.pet.name,
      "age": this.state.pet.age,
      "breed": this.state.pet.breed,
      "gender": this.state.pet.gender,
      "crate": this.state.pet.crate,
      "care_location": this.state.pet.care_location,
      "vet_name": this.state.pet.vet_name,
      "vet_address": this.state.pet.vet_address,
      "vet_city": this.state.pet.vet_city,
      "vet_state": this.state.pet.vet_state,
      "vet_zip_code": this.state.pet.vet_zip_code,
      "vet_phone": this.state.pet.vet_phone,
      "pet_medications": this.state.pet.pet_medications,
      "pet_restrictions": this.state.pet.pet_restrictions,
      "pet_image": this.state.pet.pet_image
    };
    if (this.state.name !== "" && this.state.pet.name !== this.state.name) {
      updatedPetObj.name = this.state.name;
    };
    if (this.state.age !== "" && this.state.pet.age !== this.state.age) {
      updatedPetObj.age = this.state.age;
    };
    if (this.state.breed !== "" && this.state.pet.breed !== this.state.breed) {
      updatedPetObj.breed = this.state.breed;
    };
    if (this.state.gender !== "" && this.state.pet.gender !== this.state.gender) {
      updatedPetObj.gender = this.state.gender;
    };
    if (this.state.crate !== "" && this.state.pet.crate !== this.state.crate) {
      updatedPetObj.crate = this.state.crate;
    };
    if (this.state.care_location !== "" && this.state.pet.care_location !== this.state.care_location) {
      updatedPetObj.care_location = this.state.care_location;
    };
    if (this.state.vet_name !== "" && this.state.pet.vet_name !== this.state.vet_name) {
      updatedPetObj.vet_name = this.state.vet_name;
    };
    if (this.state.vet_address !== "" && this.state.pet.vet_address !== this.state.vet_address) {
      updatedPetObj.vet_address = this.state.vet_address;
    };
    if (this.state.vet_city !== "" && this.state.pet.vet_city !== this.state.vet_city) {
      updatedPetObj.vet_city = this.state.vet_city;
    };
    if (this.state.vet_state !== "" && this.state.pet.vet_state !== this.state.vet_state) {
      updatedPetObj.vet_state = this.state.vet_state;
    };
    if (this.state.vet_zip_code !== "" && this.state.pet.vet_zip_code !== this.state.vet_zip_code) {
      updatedPetObj.vet_zip_code = this.state.vet_zip_code;
    };
    if (this.state.vet_phone !== "" && this.state.pet.vet_phone !== this.state.vet_phone) {
      updatedPetObj.vet_phone = this.state.vet_phone;
    };
    if (this.state.pet_medications !== "" && this.state.pet.pet_medications !== this.state.pet_medications) {
      updatedPetObj.pet_medications = this.state.pet_medications;
    };
    if (this.state.pet_restrictions !== "" && this.state.pet.pet_restrictions !== this.state.pet_restrictions) {
      updatedPetObj.pet_restrictions = this.state.pet_restrictions;
    };
    if (this.state.pet_image !== "" && this.state.pet.pet_image !== this.state.imageURL) {
      updatedPetObj.pet_image = this.state.imageURL;
    };

    API.updatePet({ updatedPetObj })
      .then(res =>
        //        console.log(res)
        this.getOnePet(this.state.pet.pet_id),
        this.toggle()
      )
      .then(this.setState({
        name: "",
        age: "",
        breed: "",
        gender: "",
        create: "",
        care_location: "",
        vet_name: "",
        vet_address: "",
        vet_city: "",
        vet_state: "",
        vet_zip_code: "",
        vet_phone: "",
        pet_medications: "",
        pet_restrictions: "",
        imageURL: ""
      }))
      .catch(err => console.log(err))

  };

  updateTodoCompleted = event => {
    event.preventDefault();
    console.log("inside updateTodoCompleted function of PetView Page")

    console.log("event.target.value is" + event.target.value);

    const petTodoId = event.target.value;
    console.log("petTodoId is " + petTodoId);

    API.updateTodoCompleted(petTodoId)
      .then(res =>
        this.getTodosByPetId(this.state.pet.pet_id)
      )
      .catch(err => console.log(err))

  };

  updPetCg = (event) => {
    event.preventDefault();
    console.log("inside updPetCg function of PetView Page")
    
    const cgId = event.target.value;
    const cgObj = {
      caregiver_id: cgId
    }
    console.log("cgObj is");
    console.log(cgObj);
    



    API.updPetCg(this.state.pet.pet_id, {cgObj})
      .then(res =>
          console.log(res),
          this.toggle2()
//            this.setState({ 
//              pet.caregiver_id: cgId },
//                console.log("pet state", this.state)
 //           )
      )
      //     .then(res => console.log("petTodos state ", this.state))
      .catch(err => console.log(err))

    let petObj = {};
    petObj = this.state.pet;
    console.log("petObj is");
    console.log(petObj);
    petObj.caregiver_id = cgId;
    console.log("petObj.caregiver_id is " + petObj.caregiver_id);
    
    this.setState({ 
      pet: petObj },
        console.log("pet state", this.state)
    )

  };

  ownerPage = (ownerId, username) => {
    console.log("petview.js ownerPage ownerId ", ownerId)
    console.log("petview.js ownerPage state pet owner_id ", this.state.pet.owner_id)
    this.props.history.push("/ownerview/", { ownerId: ownerId, pathName: "/petview/", username: username })
  };

  
// cg() {return this.state.caregivers.filter(cg => cg.caregiver_id === this.state.pet.caregiver_id);}


  render() {
    return (
      <div className="background">
      <div className="container fluid">
        <div className="row">
          <Container>
            <Jumbotron>
             <div className="petView"><i className=" paw3 fas fa-paw"></i> Pet View</div>
            </Jumbotron>
          </Container>
        </div>
        <div className="row">
          <div className="col-4">
            <Container>
              {this.state.pet ? (
                // <Card onClick={() => this.petView(pet.owner_id, pet.pet_id, this.state.owner[0].username)} >
                <Card onClick={this.toggle}>
                  <div>
                    <CardImg div className="pet-img" top width="100%"
                      src={this.state.pet.pet_image}
                      alt="Card image cap"
                      id={this.state.pet.pet_id}
                      key={this.state.pet.pet_id}
                    />
                    {/* <CardBody> */}
                      {/* <CardTitle>
                        {this.state.pet.name}
                      </CardTitle> */}
                    {/* </CardBody> */}
                    <CardFooter className="cardFooter">
                      <p><i className="paw3 fas fa-paw"></i>View & Edit Details for {this.state.pet.name}</p>
                      {/* <p>{this.state.pet.name}</p> */}
                    </CardFooter>
                  </div>
                </Card>

              ) : (
                  <p>Pet data was not found</p>
                )
              }

              {this.state.caregivers.filter(cg => cg.caregiver_id == this.state.pet.caregiver_id).map(cg => (
                <Card className="cg-card" onClick={this.toggle5}>
                  <div>
                    <CardImg div className="pet-img" top width="100%"
                      src={cg.caregiver_image}
                      alt="Card image cap"
                      id={cg.caregiver_id}
                      key={cg.caregiver_id}
                    />
                    <CardFooter className="cardFooter">
                      <p>Care Giver {cg.name} Details</p>
                    </CardFooter>
                  </div>
                </Card>
                ))}

              <PetViewBtn
                coldiv="col-md-4"
                type="submit"
                onClick={this.toggle2}
              >Select a Care Giver
              </PetViewBtn>

              <PetViewBtn
                coldiv="col-md-4"
                type="submit"
                onClick={() => this.ownerPage(this.state.pet.owner_id, this.props.location.state.username)}
              >Back
              </PetViewBtn>

              {/* <button className="btn btn-lg" onClick={() => this.ownerPage(this.state.pet.owner_id, this.props.location.state.username)} >
                Go Back to Onwer Overview
            </button> */}

            </Container>
          </div>
           
          {/* <div className="row"> */}
          <div className="col-8">
          <div className="row">
              <div className="col-md-12">
                <Card div className="todo-body">
                  <CardHead>
                    <h5><i className=" paw3 fas fa-paw"></i>Add a To-Do Item</h5>
                  </CardHead>
                  <div className="background"> 
                  <CardBody >
                  
                    <form>
                      <div className="row">
                        {/* <div className="col-md-2">
                          <InputRow
                            value={this.state.todoCompleted}
                            onChange={this.handleInputChange}
                            name="todoCompleted"
                            placeholder="completed(Y/N)"
                            forattribute="todoCompleted"
                            coldiv="col-md-12"
                          />
                        </div> */}
                        <div className="col-md-6">
                          <InputRow
                            value={this.state.todoDate}
                            onChange={this.handleInputChange}
                            name="todoDate"
                            title="Date:"
                            placeholder="YYYY-MM-DD"
                            forattribute="todoDate"
                            collabel="col-md-4"
                            coldiv="col-md-8"
                          />
                        </div>
                        <div className="col-md-6">
                          <InputRow
                            value={this.state.todoTime}
                            onChange={this.handleInputChange}
                            name="todoTime"
                            title="Time:"
                            placeholder="00:00"
                            forattribute="todoTime"
                            collabel="col-md-4"
                            coldiv="col-md-8"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <InputRow
                            value={this.state.todoItem}
                            onChange={this.handleInputChange}
                            name="todoItem"
                            title="Task:"
                            placeholder="To do task:"
                            forattribute="TodoItem"
                            collabel="col-md-2"
                            coldiv="col-md-10"
                          />
                        </div>
                      </div>
                        <TodoBtn
                          type="submit"
                          onClick={this.createTodoItem}
                        >Add To-Do
                    </TodoBtn>
                    </form>
                    
                  </CardBody>
                  </div>
                </Card>
              </div>
            </div>
            <div className="row todo-row">
              <div className="col-md-12 no-padding">
                      <Card div className="todo-body">
                      <CardHead>
                        <h5><i className=" paw3 fas fa-paw"></i>To-Do Item(s)</h5>
                      </CardHead>
                      <div className="background">
                      <CardBody>
                          {/* <button className="btn btn-lg mr-3 mb-5 float-left"
                            onClick={this.updateTodoCompleted}
                            name="pet_todo_id"
                            value={petTodo.pet_todo_id} >Task Completed
                          </button> */}
                          <div>
                          {this.state.petTodos.length ? (
                            <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Completed</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Task</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            {this.state.petTodos.map(petTodo => (
                              <tbody>
                              <tr>
                                <td>{petTodo.todo_completed}</td>
                                <td>{petTodo.todo_date}</td>
                                <td>{petTodo.todo_time}</td>
                                <td>{petTodo.todo_item}</td>
                                <td>
                                  <TodoDelBtn
                                    onClick={this.deleteTodo}
                                    name="pet_todo_id"
                                    value={petTodo.pet_todo_id} 
                                    >Delete
                                  </TodoDelBtn>
                                </td>
                              </tr>
                            </tbody>
                            ))}
                            </table>
                          // </div>
                      ) : (
                        <h5>No To-Do Items found</h5>
                      )}
                      </div>
                      </CardBody>
                      </div>
                      </Card>
                  </div>
            </div>
          </div>
        </div>
      

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg" backdrop="static" >
          <ModalHeader toggle={this.toggle}><div className="account"><i className=" paw3 fas fa-paw"></i>Update Pet Details</div></ModalHeader>
          <ModalBody>
            <div className="card todo-body">

              <CardHead>
              <div className="Details"><i className=" paw3 fas fa-paw"></i>Pet Details</div>
              </CardHead>
              <div className="background">
              <CardBody>
                <div className="row">
                  <div className="col-6">
                    <h5>Current Pet Details</h5>
                  </div>
                  <div className="col-6">
                    <h5>Update Pet Details</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Name: </span> {this.state.pet.name}</p>
                  </div>
                  <div className="col-6">
                    <InputBox
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      name="name"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Age: </span> {this.state.pet.age}</p>
                  </div>
                  <div className="col-6">
                    <InputBox
                      value={this.state.age}
                      onChange={this.handleInputChange}
                      name="age"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Breed: </span> {this.state.pet.breed}</p>
                  </div>
                  <div className="col-6">
                    <InputBox
                      value={this.state.breed}
                      onChange={this.handleInputChange}
                      name="breed"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Gender: </span> {this.state.pet.gender}</p>
                  </div>
                  <div className="col-6">
                    <label className="form-check-label col-md-5" htmlFor="gender">Gender:</label>
                    <div className="form-check form-check-inline" id="gender">
                      <input className="form-check-input" type="radio" name="gender" id="male" value="M" checked={this.state.gender === "M"} onChange={this.handleInputChange} />
                      <label className="form-check-label" htmlFor="male">Male</label>
                    </div>
                    <div className="form-check form-check-inline" id="gender">
                      <input className="form-check-input" type="radio" name="gender" id="female" value="F" checked={this.state.gender === "F"} onChange={this.handleInputChange} />
                      <label className="form-check-label" htmlFor="female">Female</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Crate: </span> {this.state.pet.crate}</p>
                  </div>
                  <div className="col-6">
                    <label className="form-check-label col-md-5" htmlFor="crate-radio">Crate:</label>
                    <div className="form-check form-check-inline" id="crate-radio">
                      <input className="form-check-input" type="radio" name="crate" id="inlineRadio1" value="yes" checked={this.state.crate === "yes"} onChange={this.handleInputChange} />
                      <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                    </div>
                    <div className="form-check form-check-inline" id="create-radio">
                      <input className="form-check-input" type="radio" name="crate" id="inlineRadio2" value="no" checked={this.state.crate === "no"} onChange={this.handleInputChange} />
                      <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Care Location: </span> {this.state.pet.care_location}</p>
                  </div>
                  <div className="col-6">
                    <label className="form-check-label col-md-8" htmlFor="location-radio">Care Location:</label>
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
                  <div className="col-6">
                    <p><span className="label">Vet Name: </span> {this.state.pet.vet_name}</p>
                  </div>
                  <div className="col-6">
                    <InputBox
                      value={this.state.vet_name}
                      onChange={this.handleInputChange}
                      name="vet_name"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Vet Address: </span> {this.state.pet.vet_address}</p>
                  </div>
                  <div className="col-6">
                    <InputBox
                      value={this.state.vet_address}
                      onChange={this.handleInputChange}
                      name="vet_address"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Vet City: </span> {this.state.pet.vet_city}</p>
                  </div>
                  <div className="col-6">
                    <InputBox
                      value={this.state.vet_city}
                      onChange={this.handleInputChange}
                      name="vet_city"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Vet State: </span> {this.state.pet.vet_state}</p>
                  </div>
                  <div className="col-6">
                    <InputBox
                      value={this.state.vet_state}
                      onChange={this.handleInputChange}
                      name="vet_state"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Vet Zip Code: </span> {this.state.pet.vet_zip_code}</p>
                  </div>
                  <div className="col-6">
                    <InputBox
                      value={this.state.vet_zip_code}
                      onChange={this.handleInputChange}
                      name="vet_zip_code"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Vet Phone: </span> {this.state.pet.vet_phone}</p>
                  </div>
                  <div className="col-6">
                    <InputBox
                      value={this.state.vet_phone}
                      onChange={this.handleInputChange}
                      name="vet_phone"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Pet Medications: </span> {this.state.pet.pet_medications}</p>
                  </div>
                  <div className="col-6">
                    <TextArea
                      value={this.state.pet_medications}
                      onChange={this.handleInputChange}
                      name="pet_medications"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Pet Restrictions: </span> {this.state.pet.pet_restrictions}</p>
                  </div>
                  <div className="col-6">
                    <TextArea
                      value={this.state.pet_restrictions}
                      onChange={this.handleInputChange}
                      name="pet_restrictions"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Pet Image: </span> 
                      <Image
                        src={this.state.pet.pet_image}
                        width={100}
                        height={100}
                      />
                    </p>
                  </div>
                  <div className="col-4">
                    <FileUploader
                      accept="image/*"
                      name="image"
                      randomizeFilename
                      storageRef={firebase.storage().ref("owner")}
                      onUploadStart={this.handleUploadStart}
                      onProgress={this.handleProgress}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                    />
                  </div>
                  <div className="col-2">
                    <Image
                      src={this.state.imageURL}
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="row">
                <OwnPetModalCloseBtn
                  toggle={this.toggle}
                  onClick={this.updatePet}>Save Changes
                </OwnPetModalCloseBtn>
                <Button className="modal-close" onClick={this.toggle}>Close</Button>
                </div>
              </CardBody>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className} size="lg" backdrop="static" >
          <ModalHeader toggle={this.toggle2}><div className="account"><i className=" paw3 fas fa-paw"></i>Choose a Care Giver</div></ModalHeader>
          <ModalBody>
          <div className="card todo-body">

              <CardHead>
               <div className="Details"><i className=" paw3 fas fa-paw"></i>Care Givers</div> 
              </CardHead>
              {/* <div className="background"> */}
              <CardBody>
                <div className="row">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Info</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.caregivers.map(cg => (
                        <tr>
                          <td>{cg.name}</td>
                          <td>{cg.email}</td>
                          <td>{cg.phone}</td>
                          <td>{cg.caregiver_info}</td>
                          <td><button 
                            onClick={this.updPetCg}
                            value={cg.caregiver_id}
                            >Select</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <Button className="modal-close-2" onClick={this.toggle2}>Close</Button>
                </div>
              </CardBody>
               {/* </div> */}
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modal5} toggle={this.toggle5} className={this.props.className} size="lg" backdrop="static" >
          <ModalHeader toggle={this.toggle5}><div className="account">View Care Giver Details</div></ModalHeader>
          <ModalBody>
          <div className="card todo-body">

              <CardHead>
              <div className="Details"><i className=" paw3 fas fa-paw"></i>Care Giver Details</div> 
              </CardHead>
              <div className="background">
              {this.state.caregivers.filter(cg => cg.caregiver_id == this.state.pet.caregiver_id).map(cg => (
              <CardBody>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Name: </span> {cg.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Address: </span> {cg.address}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">City: </span> {cg.city}</p>
                  </div>
                  <div className="col-3">
                    <p><span className="label">State: </span> {cg.state}</p>
                  </div>
                  <div className="col-3">
                    <p><span className="label">Zip Code: </span> {cg.zip_code}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Phone: </span> {cg.phone}</p>
                  </div>
                  <div className="col-6">
                    <p><span className="label">Secondary Phone: </span> {cg.secondary_phone}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Email: </span> {cg.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Care Giver Info: </span> {cg.caregiver_info}</p>
                  </div>
                </div>
                <Button className="modal-btn" onClick={this.toggle5}>Close</Button>
              </CardBody>
              ))}
            </div>
            </div>
          </ModalBody>
        </Modal>
        <div className="space3"></div>
      </div>
      <Footer />
      </div>

    );
  }
}

export default PetView;