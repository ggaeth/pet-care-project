// Owner model

module.exports = (sequelize, DataTypes) => {

  const Owner = sequelize.define("Owner", {
    owner_id: {
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
    owner_info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    owner_image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
      classMethods: {
        associate(models) {
          Owner.hasMany(models.Pet,
            {
              foreignKey: "fk_owner_id",
              sourceKey: "owner_id",
              onDelete: "cascade"
            }
          )
        }
      }
    },
    { underscored: true }
  );

  return Owner;
};
