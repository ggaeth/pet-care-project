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
  // Deletes the owner with the given id
  //deleteBook: function(id) {
  //  return axios.delete("/api/owners/" + ownerId);
  //},
  // Saves a pet owner to the database
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