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
    await queryInterface.createTable('comment', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      c_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'collection',
          key: 'id'
        },
        allowNull: false
      },
      reply_to: {
        references: {
          model: 'comment',
          key: 'id'
        },
        type: Sequelize.INTEGER,
        allowNull: true
      },
      content: {
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

    await queryInterface.dropTable('comment');
  }
};
