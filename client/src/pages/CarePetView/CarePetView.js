import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { AddBtn, DeleteBtn, TodoBtn, TodoDelBtn, CareBtn, PetViewBtn } from "../../components/Buttons";
import { Input, InputBox, InputRow, TextArea } from "../../components/Form";
import { CardHead } from "../../components/Card";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle, CardBody, CardFooter, CardImg, CardSubtitle, CardText } from "reactstrap";
import { Container } from "../../components/Grid";
import "./CarePetView.css";

class CarePetView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal3: false,
      modal4: false,
      pet: {},
      petTodos: [],
      owner: []
    };

    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
  }

  toggle3() {
    this.setState({
      modal3: !this.state.modal3
    });
  }

  toggle4() {
    this.setState({
      modal4: !this.state.modal4
    });
  }

  // state = {
  //   pet: {},
  //   petTodos: [],
  //   editPet: "N",
  //   owner: {}
  // };

  componentDidMount() {
    console.log("in mount CarePetView.js", this.props.location.state);
    console.log("running getOnePet from componentDidMount");
    this.getOnePet(this.props.location.state.petid);

    //    if (this.props.location.state.fromPage === "CreatePet") {
    //      console.log("location fromPage CreatePet");
    //      this.getPets(this.props.location.state.ownerid);
    //    }
    //console.log("running getTodosByPetId from componentDidMount");
    //this.getTodosByPetId(this.props.location.state.petid);
    console.log("running getOwnerById from componentDidMount");
    this.getOwnerById(this.props.location.state.ownerId);
    console.log("running getTodosByPetId from componentDidMount");
    this.getTodosByPetId(this.props.location.state.petid);
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

  getOnePet = petId => {
    console.log("inside getOnePet function of CarePetView Page")
    console.log(petId);

    API.getOnePet(petId)
      .then(res =>
        //        console.log(res)
        this.setState(
          { pet: res.data },
          console.log("pet res.data in Carepetview.js ", res)
        )
      )
      .then(res => console.log("pet state ", this.state))
      .catch(err => console.log(err))
  };

  getOwnerById = ownerId => {
    console.log("inside getOwnerById function of CarePetView Page")
    console.log(ownerId);

    API.getOwnById(ownerId)
      .then(res =>
        //        console.log(res)
        this.setState(
          { owner: res.data },
          console.log("owner res.data in Carepetview.js ", res)
        )
      )
      .then(res => console.log("owner state ", this.state))
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

  cgPage = (cgId, username) => {
    console.log("petview.js ownerPage ownerId ", cgId)
    console.log("petview.js ownerPage state pet owner_id ", this.state.pet.owner_id)
    this.props.history.push("/caregiverview/", { cgId: cgId, username: username, pathName: "/caregiverpetview/" })
  };


  render() {
    return (
      <div className="background">
      <div className="container-fluid">
        <div className="row">
          <Container>
            <Jumbotron>
              <div className="petView"><i className=" paw3 fas fa-paw"></i>Pet View</div>
            </Jumbotron>
          </Container>
        </div>
        <div className="row">
          <div className="col-4">
            <div>
              {this.state.pet ? (
                // <Card onClick={() => this.petView(pet.owner_id, pet.pet_id, this.state.owner[0].username)} >
                <Card onClick={this.toggle3}>
                  <div>
                    <CardImg div className="pet-img" top width="100%"
                      src={this.state.pet.pet_image}
                      alt="Card image cap"
                      id={this.state.pet.pet_id}
                      key={this.state.pet.pet_id}
                    />
                    <CardFooter className="cardFooter">
                      <div className="cg-Details"><i className=" paw3 fas fa-paw"></i>View Details for {this.state.pet.name}</div>
                    </CardFooter>
                  </div>
                </Card>

              ) : (
                  <p>Pet data was not found</p>
                )
              }
            </div>

            <div className="owner-card">
              {this.state.owner ? (
                // <Card onClick={() => this.petView(pet.owner_id, pet.pet_id, this.state.owner[0].username)} >
                <Card onClick={this.toggle4}>
                {this.state.owner.map(owners => (
                  <div>
                    <CardImg div className="pet-img" top width="100%"
                      src={owners.owner_image}
                      alt="Card image cap"
                      id={owners.owner_id}
                      key={owners.owner_id}
                    />
                    <CardFooter className="cardFooter">
                    <div className="owner-Details"><i className=" paw3 fas fa-paw"></i>View Details for {owners.name}</div>
                    </CardFooter>
                  </div>
                ))}
                </Card>

              ) : (
                  <p>Pet Owner data was not found</p>
                )
              }
            </div>


              
              <PetViewBtn
                coldiv="col-md-4"
                type="submit"
                onClick={() => this.cgPage(this.state.pet.owner_id, this.props.location.state.cgUserName)}
              >Back
              </PetViewBtn>
          </div>

          {/* <div className="row"> */}
          <div className="col-8">
            <div className="row"> 
            <div className="col-md-12">
          <Card div className="todo-body">
            <CardHead>
              <div className="todo-cg"><i className=" paw3 fas fa-paw"></i>To-Do Item(s)</div>
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
                      <th>Complete</th>
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
                          onClick={this.updateTodoCompleted}
                          name="pet_todo_id"
                          value={petTodo.pet_todo_id} 
                          ><i className=" paw3 fas fa-paw"></i>Completed
                        </TodoDelBtn>
                      </td>
                    </tr>
                  </tbody>
                  ))}
                  </table>
                // </div>
            ) : (
              <div className="no-todo"><i className=" paw3 fas fa-paw"></i>No To-Do Items found</div>
            )}
            </div>
            </CardBody>
            </div>
            </Card>
            </div>
          </div>
          </div>


      </div>

      <Modal isOpen={this.state.modal3} toggle={this.toggle3} className={this.props.className} size="lg" backdrop="static" >
          <ModalHeader toggle={this.toggle3}><div className="account"><i className=" paw3 fas fa-paw"></i>View Pet Details</div></ModalHeader>
          <ModalBody>
          <div className="card todo-body">

              <CardHead>
                <div className="cg-pet-details"><i className=" paw3 fas fa-paw"></i>Pet Details</div>
              </CardHead>
              <div className="background">
              <CardBody>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Name: </span> {this.state.pet.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Age: </span> {this.state.pet.age}</p>
                  </div>
                  <div className="col-6">
                    <p><span className="label">Breed: </span> {this.state.pet.breed}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Gender: </span> {this.state.pet.gender}</p>
                  </div>
                  <div className="col-6">
                    <p><span className="label">Crate: </span> {this.state.pet.crate}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Care Location: </span> {this.state.pet.care_location}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Vet Name: </span> {this.state.pet.vet_name}</p>
                  </div>
                  <div className="col-6">
                    <p><span className="label">Vet Phone: </span> {this.state.pet.vet_phone}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Vet Address: </span> {this.state.pet.vet_address}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Vet City: </span> {this.state.pet.vet_city}</p>
                  </div>
                  <div className="col-3">
                    <p><span className="label">Vet State: </span> {this.state.pet.vet_state}</p>
                  </div>
                  <div className="col-3">
                    <p><span className="label">Vet Zip Code: </span> {this.state.pet.vet_zip_code}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Pet Medications: </span> {this.state.pet.pet_medications}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Pet Restrictions: </span> {this.state.pet.pet_restrictions}</p>
                  </div>
                </div>
                <Button className="modal-btn" onClick={this.toggle3}>Close</Button>
              </CardBody>
            </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modal4} toggle={this.toggle4} className={this.props.className} size="lg" backdrop="static" >
          <ModalHeader toggle={this.toggle4}><div className="account"><i className=" paw3 fas fa-paw"></i>View Pet Owner Details</div></ModalHeader>
          <ModalBody>
          <div className="card todo-body">

              <CardHead>
                <div className="pet-owner-details"><i className=" paw3 fas fa-paw"></i>Pet Owner Details</div>
              </CardHead>
              <div className="background">
              {this.state.owner.map(ownerModal => (
              <CardBody>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Name: </span> {ownerModal.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Address: </span> {ownerModal.address}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">City: </span> {ownerModal.city}</p>
                  </div>
                  <div className="col-3">
                    <p><span className="label">State: </span> {ownerModal.state}</p>
                  </div>
                  <div className="col-3">
                    <p><span className="label">Zip Code: </span> {ownerModal.zip_code}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p><span className="label">Phone: </span> {ownerModal.phone}</p>
                  </div>
                  <div className="col-6">
                    <p><span className="label">Secondary Phone: </span> {ownerModal.secondary_phone}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Email: </span> {ownerModal.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p><span className="label">Owner Info: </span> {ownerModal.owner_info}</p>
                  </div>
                </div>
                <Button className="modal-btn" onClick={this.toggle4}>Close</Button>
              </CardBody>
              ))}
            </div>
            </div>
          </ModalBody>
        </Modal>
      
        </div>
        <Footer />
      </div>
    );
  }
}
export default CarePetView;