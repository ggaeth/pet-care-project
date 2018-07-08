import axios from "axios";


console.log("inside utils/API.js");

export default {
  // 
  getLogin: function () {
    return axios.get("/login");
  },
  getOwnLogin: function (userName) {
    console.log("inside getOwnLogin");
    console.log("userName is " + userName);
    return axios.get("api/users/owner/" + userName);
  },
  getCareLogin: function (userName) {
    console.log("inside getCareLogin");
    console.log("userName is " + userName);
    return axios.get("api/users/caregiver/" + userName);
  },
  createOwnLogin: function (ownLogObj) {
    console.log("inside ownerLogin");
    return axios.post("/api/users/owner", ownLogObj);
  },
  createCareLogin: function (careLogObj) {
    console.log("inside createCareLogin");
    return axios.post("/api/users/caregiver", careLogObj);
  },
  // Gets the owner with the given userName
  getOwner: function (userName) {
    console.log("inside getOwner");
    return axios.get("/api/owners/" + userName);
  },
    //================ caregiver get route ==================
  getAllCgs: function () {
    console.log("inside getAllCgs");
    return axios.get("/api/caregivers/");
  },
  getCg: function (userName) {
    console.log("inside getCg");
    return axios.get("/api/caregivers/" + userName);
  },
  getPetsCg: function (caregiver_id) {
    console.log("Inside getPetsCg");
    return axios.get("/api/pets/byCgId/" + caregiver_id)
  },
  getPets: function (ownerId) {
    console.log("inside getPets");
    return axios.get("/api/pets/byOwnerId/" + ownerId);
  },
  getOnePet: function (petId) {
    console.log("inside getOnePet axios call");
    return axios.get("/api/pets/byPetId/" + petId);
  },
  getOwnById: function (ownerId) {
    console.log("inside getOwnById axios call");
    return axios.get("/api/owners/ownById/" + ownerId);
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
  updPetCg: function (petId, cgObj) {
    console.log("inside updPetCg axios call");
    return axios.put("/api/pets/byPetId/" + petId, cgObj);
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