const { User } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'securepass456'
  },
  {
    username: 'bob_rogers',
    email: 'bob@example.com',
    password: 'secretword789'
  }
];

// Seed the users into the database
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
