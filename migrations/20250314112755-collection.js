'use strict';

const env = process.env.NODE_ENV || 'development';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('collection', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      }, 
      owner_email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'user',
          key: 'email'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      c_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      c_description: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {schema: env})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('collection');
  }
};
