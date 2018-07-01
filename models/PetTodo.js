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
    todo_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    todo_time: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
    },
    todo_item: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    todo_completed: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
  }, {
      classMethods: {
        associate(models) {
          PetTodo.belongsTo(models.Pet,
            {
              foreignKey: "fk_pet_id",
              targetKey: "pet_id"
            }
          )
        }
      }
    }, 
    { underscored: true,
      paranoid: true }
  );

  return PetTodo;
};