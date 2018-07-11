'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Owner.hasMany(db.Pet, { foreignKey: 'fk_owner_id', sourceKey: 'owner_id', onDelete: 'cascade' });
db.Pet.belongsTo(db.Owner, { foreignKey: 'fk_owner_id', targetKey: 'owner_id', onDelete: 'cascade'});
db.Caregiver.hasMany(db.Pet, { foreignKey: 'fk_caregiver_id', sourceKey: 'caregiver_id', onDelete: 'cascade' });
db.Pet.belongsTo(db.Caregiver, { foreignKey: 'fk_caregiver_id', targetKey: 'caregiver_id', onDelete: 'cascade' });
db.Pet.hasMany(db.PetTodo, { foreignKey: 'fk_pet_id', sourceKey: 'pet_id', onDelete: 'cascade' });
db.PetTodo.belongsTo(db.Pet, { foreignKey: 'fk_pet_id', targetKey: 'pet_id', onDelete: 'cascade' });

module.exports = db;
