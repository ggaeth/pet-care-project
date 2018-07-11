const router = require("express").Router();
const pettodosController = require("../../controllers/pettodos_controller");

// Matches with "/api/pettodos"
router
  .route("/")
  .post(pettodosController.create)

// Matches with "/api/pettodos/:petId"
router
  .route("/:petId")
  .get(pettodosController.getTodosByPetId)

// Matches with "/api/pettodos/:petTodoId"
router
  .route("/:petTodoId")
  .delete(pettodosController.destroy)
  .put(pettodosController.updateTodoCompleted)

module.exports = router;
