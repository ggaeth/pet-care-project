const db = require("../models/");

module.exports = {
  getTodosByPetId: function (req, res) {
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
  },
  create: function (req, res) {
    db.PetTodo
      .create(req.body.newTodo)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  destroy: function (req, res) {
    db.PetTodo
      .destroy({
        where: { pet_todo_id: req.params.petTodoId }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateTodoCompleted: function (req, res) {
    db.PetTodo
      .update(
        { todo_completed: "Y" },
        { where: { pet_todo_id: req.params.petTodoId }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
