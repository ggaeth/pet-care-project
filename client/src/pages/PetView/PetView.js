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
    todoTime: null,
    todoItem: null
  };

  componentDidMount() {
    console.log("in mount PetView.js", this.props.location.state);

    this.getOnePet(this.props.location.state.petid);

        //    if (this.props.location.state.fromPage === "CreatePet") {
        //      console.log("location fromPage CreatePet");
        //      this.getPets(this.props.location.state.ownerid);
        //    }
      
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
          console.log("petTodos res.data in petview.js ", res)
        )
      )
 //     .then(res => console.log("petTodos state ", this.state))
      .catch(err => console.log(err))
  };

  createTodoItem = event => {
    event.preventDefault();
    console.log("inside createTodoItem function in PetView.js");

    const newTodo = {
      "pet_id": this.state.pet.pet_id,
      "name": this.state.pet.name,
      "todo_time": this.state.todoTime,
      "todo_item": this.state.todoItem,
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
         this.setState(
          { petTodos: res.data },
          console.log("petTodos res.data in petview.js ", res)
        )
      )
  //      this.props.history.push("/owner/", this.state.ownerUsername))
      .catch(err => console.log(err));
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
                <p>Pet Name: {this.state.pet.name}</p>
              ) : (
                <p>Pet data was not found</p>
              )
            }
          </Container>
        </div>
        <div className="row">
          <Container>
            {this.state.petTodos.todo_item ? (
              <p>Todo Item: {this.state.petTodos.todo_item}</p>
            ) : (
                <p>No todo Items found</p>
              )
            }
          </Container>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <CardBody>
                <form>
                  <div className="row">
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.todoTime}
                        onChange={this.handleInputChange}
                        name="todoTime"
                        placeholder="Time:"
                        forattribute="todoTime"
                        coldiv="col-md-12"
                      />
                    </div>
                    <div className="col-md-7">
                      <InputRow
                        value={this.state.todoItem}
                        onChange={this.handleInputChange}
                        name="todoItem"
                        placeholder="To Do:"
                        forattribute="TodoItem"
                        coldiv="col-md-12"
                      />
                    </div>


                    <AddBtn 
                      type="submit"
                      onClick={this.createTodoItem}
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
    );
  }
}

export default PetView;