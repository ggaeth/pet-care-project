// Pet model

module.exports = (sequelize, DataTypes) => {

  const Pet = sequelize.define("Pet", {
    pet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false
    },
    caregiver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: 0
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    crate: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    care_location: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    vet_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vet_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vet_city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vet_state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vet_zip_code: {
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    vet_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pet_medications: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pet_restrictions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pet_image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      classMethods: {
        associate(models) {
          Pet.belongsTo(models.Owner,
            {
              foreignKey: "fk_owner_id",
              targetKey: "owner_id",
              onDelete: "cascade"
            }
          ),
          Pet.hasMany(models.PetTodo,
            {
              foreignKey: "fk_pet_id",
              sourceKey: "pet_id",
              onDelete: "cascade"
            }
          ),
          Pet.belongsTo(models.Caregiver,
            {
              foreignKey: "fk_caregiver_id",
              targetKey: "caregiver_id",
              onDelete: "cascade"
            }
          )
        }
      }
    },
    { underscored: true }
  );

  return Pet;
};