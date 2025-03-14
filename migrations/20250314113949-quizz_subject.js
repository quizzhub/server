'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('quizz_subject', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      collection_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'collection',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
      },
      s_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      s_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: { 
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: { 
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('quizz_subject');
  }
};
