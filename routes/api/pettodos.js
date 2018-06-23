const router = require("express").Router();
const pettodosController = require("../../controllers/pettodos_controller");

// Matches with "/api/pettodos"
router
  .route("/")
//  .get(pettodosController.findAll)
  .post(pettodosController.create);

// Matches with "/api/pettodos/:id"
router
//  .route("/:id")
//  .get(pettodosController.findById)
//  .put(pettodosController.update)
//  .delete(pettodosController.remove);

module.exports = router;
