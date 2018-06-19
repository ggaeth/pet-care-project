// Pet model

module.exports = (sequelize, DataTypes) => {

  const Pet = sequelize.define("Pet", {
    pet_id: {
      type: Sequelize.INTEGER,
      primary_key: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    gender: DataTypes.STRING,
    crate: DataTypes.BOOLEAN,
    vet_name: DataTypes.STRING,
    vet_address: DataTypes.STRING,
    vet_phone: DataTypes.INTEGER,
    pet_image: DataTypes.STRING,
    pet_medications: DataTypes.STRING,
    pet_restrictions: DataTypes.STRING,
  }, {
      classMethods: {
        associate(models) {
          Pet.hasMany(models.pet_todos);
        }
      }
    });
    
  return Pet;
};