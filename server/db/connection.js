const Sequelize = require('sequelize');

var local=new Sequelize('nodejs_boilerplate', 'postgres', 'password', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000
    },
    operatorsAliases:false
  // logging:false
});




var sequelize = local;

module.exports.sequelize=sequelize;

sequelize.sync({
    force:false,
    // alter:true 
});
