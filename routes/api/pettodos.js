const router = require("express").Router();
const pettodosController = require("../../controllers/pettodos_controller");

console.log("inside api/pettodos.js");

// Matches with "/api/pettodos"
router
  .route("/")
//  .get(pettodosController.findAll)
  .post(pettodosController.create)

// Matches with "/api/pettodos/:petId"
router
  .route("/:petId")
  .get(pettodosController.getTodosByPetId)
//  .put(pettodosController.update)
//  .delete(pettodosController.destroy)

// Matches with "/api/pettodos/:petTodoId"
router
  .route("/:petTodoId")
  .delete(pettodosController.destroy)
  .put(pettodosController.updateTodoCompleted)

module.exports = router;
