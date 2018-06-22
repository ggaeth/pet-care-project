import axios from "axios";

export default {
  // Gets all books
  getLogin: function() {
    return axios.get("/login");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  createOwner: function(newOwner) {
    console.log("inside createOwner");
    console.log(JSON.stringify(newOwner, null, 2) + "\n");
    return axios.post("/api/owners", newOwner);
  }
};
