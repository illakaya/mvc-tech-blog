const { User } = require('../models');

const userData = [
  {
    username: 'Xandromus',
    password: 'mvcChamp123',
  },
  {
    username: 'Lernantino',
    password: 'objectRelational098',
  },
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true, //hooks: true,
});

module.exports = seedUsers;