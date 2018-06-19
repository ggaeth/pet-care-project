// Caregiver model

module.exports = (sequelize, DataTypes) => {

  const Owner = sequelize.define("Caregiver", {
    caregiver_id: {
      type: Sequelize.INTEGER,
      primary_key: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.INTEGER(5),
    phone: DataTypes.INTEGER,
    secondary_phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    caregiver_image: DataTypes.STRING,
    caregiver_info: {
      type: Sequelize.TEXT("medium")
    },
  }, {
      classMethods: {
        associate(models) {
          Caregiver.hasMany(models.Pet);
        }
      }
    });

  return Caregiver;
};
