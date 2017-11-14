'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Université de Tunis',
      reviews: [
        'Range types are data types representing a range of values of some element type (called the range`s subtype).',
        'An array of type, e.g. DataTypes.ARRAY(DataTypes.DECIMAL).'
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Western State University College of Law',
      reviews: [
        'A binary storage JSON column. Only available in Postgres.',
        'A default value of the current timestamp'
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Fine Arts Academy in Wroclaw',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Fasa Faculty of Medical Sciences',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Universidad de Sevilla',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
