const { Sequelize } = require('sequelize');
const config = require('@root/config/config')

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      logging: false,
      pool: { 
        max: 10, 
        min: 5,
        acquire: 30000,
        idle: 10000,
        evict: 2000 
      }
    }
);

module.exports = sequelize;