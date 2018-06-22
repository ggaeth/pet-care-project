// Pet model

module.exports = (sequelize, DataTypes) => {

  const PetTodo = sequelize.define("PetTodo", {
    pet_todo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pet_id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    todo_item: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
      classMethods: {
        associate(models) {
          PetTodo.belongsTo(models.Pet);
        }
      }
    });

  return PetTodo;
};