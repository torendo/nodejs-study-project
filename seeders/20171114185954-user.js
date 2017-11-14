'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      login: "See",
      password: "1997",
      fullname: "See Tzuker",
      email: "stzuker0@about.me",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      login: "Wally",
      password: "1993",
      fullname: "Wally Fishley",
      email: "wfishley1@ucoz.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      login: "Nadiya",
      password: "2012",
      fullname: "Nadiya Noteyoung",
      email: "nnoteyoung2@t-online.de",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      login: "Melisa",
      password: "1993",
      fullname: "Melisa Shout",
      email: "mshout3@huffingtonpost.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      login: "Lexine",
      password: "1994",
      fullname: "Lexine Wrightham",
      email: "lwrightham4@cnbc.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
