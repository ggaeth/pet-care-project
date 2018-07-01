const db = require("../models/");

module.exports = {
  getTodosByPetId: function (req, res) {
    console.log("req.params is")
    console.log(JSON.stringify(req.params, null, 2))
    console.log("inside pettodos_controller getTodosByPetId function")
    db.PetTodo
      .findAll({
        where: {
          pet_id: req.params.petId
        }
        // we may want a sort order here
      })
      .then(dbPetTodos =>
        res.json(dbPetTodos))
      .catch(err => res.status(422).json(err));
    //.catch(err => console.log(JSON.stringify(err, null, 2) + "\n"));
  },
  create: function (req, res) {
    console.log("inside pettodos_controller create function")
    console.log(req.body)
    db.PetTodo
      .create(req.body.newTodo)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  destroy: function (req, res) {
    console.log("inside pettodos_controller destroy function")
    console.log(req.params.petTodoId)
    db.PetTodo
      .destroy({
        where: { pet_todo_id: req.params.petTodoId }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateTodoCompleted: function (req, res) {
    console.log("inside updateTodoCompleted function")
    console.log(req.params.petTodoId)
    db.PetTodo
      .update(
        { todo_completed: "Y" },
        { where: { pet_todo_id: req.params.petTodoId }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
