// Caregiver model

module.exports = (sequelize, DataTypes) => {

  const Caregiver = sequelize.define("Caregiver", {
    caregiver_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondary_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    caregiver_info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    caregiver_image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
      classMethods: {
        associate(models) {
          Caregiver.hasMany(models.Pet);
        }
      }
    }, { underscored: true });


  return Caregiver;
};
