import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { AddBtn, DeleteBtn,CreateBtn } from "../../components/Buttons";
import { Input, InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import "./PetView.css";

class CreateToDo extends Component {
  state = {
    pet: {},
    todo: []
  };

  componentDidMount() {
    console.log("in mount PetView.js", this.props.location.state);
    this.getOnePet(this.props.location.state.petid);
  };

  getOnePet = petId => {
    console.log(petId);

    API.getOnePet(petId)
      .then(res =>
        this.setState(
          { pet: res.data },
          console.log("pet res.data in petview.js ", res)
        )
      )
      .then(res => console.log("pet state ", this.pet))
      .then(res => this.getTodos(this.props.location.state.petid))
      .catch(err => console.log(err))

  };
  
  //not sure if we need the getTodos or if they will be inclued in the pets when we get them back.
  getTodos = petId => {
    console.log(petId);

    API.getTodos(petId)
      .then(res =>
        this.setState(
          { todo: res.data },
          console.log("pet res.data in petview.js ", res)
        )
      )
      .then(res => console.log("pet state ", this.pet))
      .catch(err => console.log(err))

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


  addTodo = event => {
    event.preventDefault();

    const newToDo = {
      "todo_time": this.state.timeToDo,
      "todo_item:": this.state.ToDo,

    };
    console.log("newToDo object that will be sent to server: ");
    console.log(JSON.stringify(newToDo, null, 2) + "\n");

    API.createTodo({ newToDo })
      .then(res =>
        this.setState(
          { todo: res.data },
          console.log("todo add res.data in petview.js ", res)
        ))
      .catch(err => console.log(err));

    //    console.log("newOwner object that will be sent to server: ");
    //    console.log(JSON.stringify(newOwner, null, 2) + "\n");
  };

  deleteTodo = todoId => {
    // event.preventDefault();

    API.deleteTodo({ todoId })
      .then(res =>
        this.setState(
          { todo: res.data },
          console.log("todo delete res.data in petview.js ", res)
        ))
      .catch(err => console.log(err));

    //    console.log("newOwner object that will be sent to server: ");
    //    console.log(JSON.stringify(newOwner, null, 2) + "\n");
  };

  editPet = event => {
    event.preventDefault();

    const editPet = {
      "owner_id": this.state.owner_id,
      "name": this.state.name,
      "age": this.state.age,
      "breed": this.state.breed,
      "gender": this.state.gender,
      "crate": this.state.crate,
      "vet_name": this.state.vet_name,
      "vet_address": this.state.vet_address,
      "vet_city": this.state.vet_city,
      "vet_state": this.state.vet_state,
      "vet_zip_code": this.state.vet_zip_code,
      "vet_phone": this.state.vet_phone,
      "pet_medications": this.state.pet_medications,
      "pet_restrictions": this.state.pet_restrictions,
      "pet_image": this.state.pet_image
    };
    console.log("editPet object that will be sent to server: ");
    console.log(JSON.stringify(editPet, null, 2) + "\n");

    API.editPet({ editPet })
      .then(res => 
          this.setState(
            { pet: res.data },
            console.log("edit pet res.data in petview.js ", res)
          ))
      // .then(res => console.log("res ", res))
      .catch(err => console.log(err));

    console.log("editPet object that will be sent to server: ");
    console.log(JSON.stringify(editPet, null, 2) + "\n");
  };

  deletePet = petId => {
    // event.preventDefault();

    API.deletePet({ petId })
      .then(res =>
        this.setState(
          { todo: res.data },
          console.log("todo delete res.data in petview.js ", res)
        ))
      .catch(err => console.log(err));

    //    console.log("newOwner object that will be sent to server: ");
    //    console.log(JSON.stringify(newOwner, null, 2) + "\n");
  };

  render() {
    return (
      <div className="container fluid">
        <div className="row">
          <div className="row">
          <div className="col-md-6">
            <div className="card">
              <CardBody>
                <form>
                  <InputRow
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                    title="Name:"
                    forattribute="petNm"
                    collabel="col-md-2"
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
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.gender}
                        onChange={this.handleInputChange}
                        name="gender"
                        title="Gender:"
                        forattribute="petGender"
                        collabel="col-md-4"
                        coldiv="col-md-8"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-check-label col-md-4" htmlFor="crate-radio">Crate:</label>
                      <div className="form-check form-check-inline" id="create-radio">
                        <input className="form-check-input" type="radio" name="crate" id="inlineRadio1" value="true" checked={this.state.crate === "true"} onChange={this.handleInputChange} />
                        <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline" id="create-radio">
                        <input className="form-check-input" type="radio" name="crate" id="inlineRadio2" value="false" checked={this.state.crate === "false"} onChange={this.handleInputChange} />
                        <label className="form-check-label" htmlFor="inlineRadio2">No</label>
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
                    <div className="col">
                      <InputRow
                        value={this.state.vet_address}
                        onChange={this.handleInputChange}
                        name="vet_address"
                        title="Vet Address:"
                        forattribute="petVetAdd"
                        collabel="col-md-2"
                        coldiv="col-md-10"
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
                    <div className="col-md-3">
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
                    <div className="col-md-3">
                      <InputRow
                        value={this.state.vet_zip_code}
                        onChange={this.handleInputChange}
                        name="vet_zip_code"
                        title="Vet Zip:"
                        forattribute="vetZp"
                        collabel="col-md-3"
                        coldiv="col-md-9"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <InputRow
                        value={this.state.pet_image}
                        onChange={this.handleInputChange}
                        name="pet_image"
                        title="Image:"
                        forattribute="petImg"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                    </div>
                  </div>
                  <TextArea
                    value={this.state.pet_medications}
                    onChange={this.handleInputChange}
                    name="pet_medications"
                    title="Medications"
                    forattribute="petMeds"
                  />
                  <TextArea
                    value={this.state.pet_restrictions}
                    onChange={this.handleInputChange}
                    name="pet_restrictions"
                    title="Retrictions"
                    forattribute="petRetict"
                  />
                  <CreateBtn
                    onClick={this.editPet}
                  >
                    Edit Pet
                  </CreateBtn>
                </form>
              </CardBody>
            </div>
          
              <div className="col-md-6 text-center">
                <DeleteBtn
                  onClick={() => this.deletePet(this.state.pet.pet_id)}
                >
                  Delete Pet
                </DeleteBtn>
              </div>
            </div>
            <div className="col-md-6">
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
                        onClick={this.addTodo}
                      >
                        Add a New To-Do
                      </AddBtn>
                    </div>
                  </form>
                </CardBody>
              </div>
            </div>
          </div>
{/* !!  I think the two below lines will need to be change to the following once we are populating the pet state */}
            {/* this.state.pet.todo.etc */}
          {this.state.todo.length ? (
            <div className="row">
              {this.state.todo.map(todos => (
                <div className="col">
                  <div className="card">
                    <CardBody>
                      <form>
                        <div className="row">
                          <div className="col-md-3">
                            <p>{todos.todo_time}</p>
                          </div>
                          <div className="col-md-7">
                          <p>{todos.todo_item}</p>
                          </div>
                          <DeleteBtn
                            onClick={() => this.deleteTodo(todos.pet_todo_id)}
                          >
                            Delete To-Do
                          </DeleteBtn>
                        </div>
                      </form>
                    </CardBody>
                  </div>
                </div>
              ))}
            </div>
          ) : ( <p> no todo's </p>)}
          </div>
        </div>
    );
  }
}

export default CreateToDo;