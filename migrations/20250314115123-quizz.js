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

    await queryInterface.createTable('quizz', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNullL: false,
        primaryKey: true 
      },
      qs_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "quizz_subject",
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      q_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      q_description: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {schema: env});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('quizz')
  }
};
