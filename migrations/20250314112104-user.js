'use strict';

const env = process.env.NODE_ENV || 'development';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "GUEST"
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {schema: env}) 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};
