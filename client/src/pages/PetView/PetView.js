import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { AddBtn, DeleteBtn,CreateBtn } from "../../components/Buttons";
import { Input, InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import { Container} from "../../components/Grid";
import "./PetView.css";

class PetView extends Component {
  state = {
    pet: {},
    petTodos: [],
    editPet: "N"
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
      "todo_completed": this.state.todoCompleted,
      "fk_pet_id": this.state.pet.pet_id
    };
    console.log("newToDo object that will be sent to server: ");
    console.log(JSON.stringify(newTodo, null, 2) + "\n");

    API.createTodo({newTodo})
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

  editPet = event => {
    event.preventDefault();
    console.log("inside editPet function of PetView Page");

    console.log("this.state is ");
    console.log(this.state);
      
    const petId = this.state.pet.pet_id;
    console.log("petId is " + petId);

    this.setState(
      { editPet: "Y" },
      console.log("editPet state", this.state.editPet)
    )
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
        "pet_medications": this.state.pet.pet_medications,
        "pet_restrictions": this.state.pet.pet_restrictions
    }; 
    if (this.state.pet.age !== this.state.age) {
      updatedPetObj.age = this.state.age;
    };
    if(this.state.pet.pet_medications !== this.state.pet_medications) {
      updatedPetObj.pet_medications = this.state.pet_medications;
    };
    if (this.state.pet.pet_restrictions !== this.state.pet_restrictions) {
      updatedPetObj.pet_restrictions = this.state.pet_restrictions;
    };
 
    API.updatePet({updatedPetObj})
      .then(res =>
//        console.log(res)
        this.getOnePet(this.state.pet.pet_id)
      )
      .then(this.setState(
        { editPet: "N" },
        console.log("editPet state", this.state.editPet)
      ))
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

  ownerPage = (ownerId, username) => {
    console.log("petview.js ownerPage ownerId ", ownerId)
    console.log("petview.js ownerPage state pet owner_id ", this.state.pet.owner_id)
    this.props.history.push("/ownerview/", { ownerId: ownerId, pathName: "/petview/", username: username })
  };


  render() {
    return (
      <div className="container fluid">
        <div className="row">
          <Container>
            <Jumbotron>
              Pet View
            </Jumbotron>
          </Container>
        </div>
        <div className="row">
          <Container>
            {this.state.pet ? (
              <div className="container">
                <div className="row">
                  <p>Pet Name: {this.state.pet.name}</p>
                </div>
                <div className="row">
                  <p>Pet Age: {this.state.pet.age}</p>
                </div>
                <div className="row">
                  <p>Pet Medications: {this.state.pet.pet_medications}</p>
                </div>
                <div className="row">
                  <p>Pet Restrictions: {this.state.pet.pet_restrictions}</p>
                </div>
              </div>
            ) : (
                <p>Pet data was not found</p>
              )
            }
            <button className="btn btn-lg" onClick={() =>  this.ownerPage(this.state.pet.owner_id, this.props.location.state.username)} >
              Go Back
            </button>
            <button className="btn btn-lg float-right" onClick={this.editPet} >
              Edit Pet
            </button>
            {this.state.editPet === "Y" ? (
              <div className="row">
                <form>
                  <InputRow
                    value={this.state.pet.name}
                    onChange={this.handleInputChange}
                    name="name"
                    title="Name:"
                    forattribute="petNm"
                    collable="col-md-2"
                    coldiv="col-md-6"
                  />
                  <InputRow
                    value={this.state.pet.age}
                    onChange={this.handleInputChange}
                    name="age"
                    title="Age:"
                    forattribute="petAge"
                    collabel="col-md-2"
                    coldiv="col-md-2"
                  />
                  <div className="row">
                    <div className="col">
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
                    <div className="col">
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
                    onClick={this.updatePet}>Save Changes
                  </CreateBtn>
                </form>
              </div>
            ) : (
                <p></p>
              )
            }
          </Container>
        </div>
        <div className="row">
          <Container>
            {this.state.petTodos.length ? (
              <div>
                {this.state.petTodos.map(petTodo => (
                  <div>
                    <p>
                    <button className="btn btn-lg mr-3 mb-5 float-left"
                      onClick={this.updateTodoCompleted}
                      name="pet_todo_id"
                      value={petTodo.pet_todo_id} >Task Completed
                    </button>
                    Item Completed: {petTodo.todo_completed} __
                    Todo Item: {petTodo.todo_item} 
                      <button className="DeleteBtn btn btn-sm btn-success float-right"
                        onClick={this.deleteTodo} 
                        name="pet_todo_id"
                        value={petTodo.pet_todo_id} >Delete
                      </button>
                      </p>
                  </div>
              ))}
              </div>
            ) : (
              <p>No todo Items found</p>
            )}
          </Container>
        </div>
        <div className="row mb-5">
          <div className="col">
            <div className="card">
              <CardBody>
                <form>
                  <div className="row">
                    <div className="col-md-2">
                      <InputRow
                        value={this.state.todoCompleted}
                        onChange={this.handleInputChange}
                        name="todoCompleted"
                        placeholder="completed(Y/N)"
                        forattribute="todoCompleted"
                        coldiv="col-md-12"
                      />
                    </div>
                    <div className="col-md-2">
                      <InputRow
                        value={this.state.todoDate}
                        onChange={this.handleInputChange}
                        name="todoDate"
                        placeholder="Date(YYYY-MM-DD)"
                        forattribute="todoDate"
                        coldiv="col-md-12 px-0"
                      />
                    </div>
                    <div className="col-md-2">
                      <InputRow
                        value={this.state.todoTime}
                        onChange={this.handleInputChange}
                        name="todoTime"
                        placeholder="Time(00:00)"
                        forattribute="todoTime"
                        coldiv="col-md-12"
                      />
                    </div>
                    <div className="col-md-5 mr-3">
                      <InputRow
                        value={this.state.todoItem}
                        onChange={this.handleInputChange}
                        name="todoItem"
                        placeholder="To do task:"
                        forattribute="TodoItem"
                        coldiv="col-md-12"
                      />
                    </div>
                    <AddBtn 
                      type="submit"
                      onClick={this.createTodoItem}
                    >Add
                    </AddBtn>
                  </div>
                </form>
              </CardBody>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PetView;