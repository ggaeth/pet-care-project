import axios from "axios";


console.log("inside utils/API.js");

export default {
  // 
  getLogin: function () {
    return axios.get("/login");
  },
  // Gets the owner with the given userName
  getOwner: function (userName) {
    console.log("inside getOwner");
    return axios.get("/api/owners/" + userName);
  },
  getPets: function (ownerId) {
    console.log("inside getPets");
    return axios.get("/api/pets/byOwnerId/" + ownerId);
  },
  getOnePet: function (petId) {
    console.log("inside getOnePet axios call");
    return axios.get("/api/pets/byPetId/" + petId);
  },
  getTodosByPetId: function (petId) {
    console.log("inside getTodosByPetId axios call");
    return axios.get("/api/pettodos/" + petId);
  },
  updateTodoCompleted: function (petTodoId) {
    return axios.put("/api/pettodos/" + petTodoId);
  },
  updatePet: function (updatedPetObj) {
    console.log("inside updatePet axios call");
    return axios.put("/api/pets", updatedPetObj);
  },
  deletePet: function (petId) {
    return axios.delete("/api/pets/byPetId/" + petId);
  },
  deleteTodo: function(petTodoId) {
    return axios.delete("/api/pettodos/" + petTodoId);
  },
  createOwner: function (newOwner) {
    console.log("inside createOwner");
    console.log(JSON.stringify(newOwner, null, 2) + "\n");
    return axios.post("/api/owners", newOwner);
  },
  createPet: function (newPet) {
    console.log("inside createPet");
    console.log(JSON.stringify(newPet, null, 2) + "\n");
    return axios.post("/api/pets", newPet);
  },
  createTodo: function (newTodo) {
    console.log("inside createTodo");
    console.log(JSON.stringify(newTodo, null, 2) + "\n");
    return axios.post("/api/pettodos", newTodo);
  },
  createCaregiver: function(newCaregiver) {
    console.log("inside createCaregiver");
    console.log(JSON.stringify(newCaregiver, null, 2) + "\n");
    return axios.post("/api/caregivers", newCaregiver);
  }
};