import axios from "axios";

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
  createCaregiver: function(newCaregiver) {
    console.log("inside createCaregiver");
   console.log(JSON.stringify(newCaregiver, null, 2) + "\n");
   return axios.post("/api/caregivers", newCaregiver);
  }
};