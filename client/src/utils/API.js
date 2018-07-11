import axios from "axios";

export default {
  // 
  getLogin: function () {
    return axios.get("/login");
  },
  getOwnLogin: function (userName) {
    return axios.get("api/users/owner/" + userName);
  },
  getCareLogin: function (userName) {
    return axios.get("api/users/caregiver/" + userName);
  },
  createOwnLogin: function (ownLogObj) {
    return axios.post("/api/users/owner", ownLogObj);
  },
  createCareLogin: function (careLogObj) {
    return axios.post("/api/users/caregiver", careLogObj);
  },
  getOwner: function (userName) {
    return axios.get("/api/owners/" + userName);
  },
  getAllCgs: function () {
    return axios.get("/api/caregivers/");
  },
  getCg: function (userName) {
    return axios.get("/api/caregivers/" + userName);
  },
  getPetsCg: function (caregiver_id) {
    return axios.get("/api/pets/byCgId/" + caregiver_id)
  },
  getPets: function (ownerId) {
    return axios.get("/api/pets/byOwnerId/" + ownerId);
  },
  getOnePet: function (petId) {
    return axios.get("/api/pets/byPetId/" + petId);
  },
  getOwnById: function (ownerId) {
    return axios.get("/api/owners/ownById/" + ownerId);
  },
  getTodosByPetId: function (petId) {
    return axios.get("/api/pettodos/" + petId);
  },
  updateTodoCompleted: function (petTodoId) {
    return axios.put("/api/pettodos/" + petTodoId);
  },
  updatePet: function (updatedPetObj) {
    return axios.put("/api/pets", updatedPetObj);
  },
  updPetCg: function (petId, cgObj) {
    return axios.put("/api/pets/byPetId/" + petId, cgObj);
  },
  deletePet: function (petId) {
    return axios.delete("/api/pets/byPetId/" + petId);
  },
  deleteTodo: function(petTodoId) {
    return axios.delete("/api/pettodos/" + petTodoId);
  },
  createOwner: function (newOwner) {
    return axios.post("/api/owners", newOwner);
  },
  createPet: function (newPet) {
    return axios.post("/api/pets", newPet);
  },
  createTodo: function (newTodo) {
    return axios.post("/api/pettodos", newTodo);
  },
  createCaregiver: function(newCaregiver) {
    return axios.post("/api/caregivers", newCaregiver);
  }
};