// Owner model

module.exports = (sequelize, DataTypes) => {
  
  const Owner = sequelize.define("Owner", {
    owner_id: {
      type:   Sequelize.INTEGER,
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
    owner_image: DataTypes.STRING,
    owner_info: {
      type: Sequelize.TEXT("medium")
    },
  }, {
      classMethods: {
        associate(models) {
          Owner.hasMany(models.Pet);
        }
      }
    }, { underscored: true });
    
  return Owner;
};
