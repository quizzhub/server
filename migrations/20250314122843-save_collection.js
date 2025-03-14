'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('save_collection', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      user: {
        type: Sequelize.STRING,
        references: {
          model: 'user',
          key: 'email'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      c_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'collection',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('save_collection');
  }
};
