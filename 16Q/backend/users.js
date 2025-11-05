const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    username: 'rasagna23',
    password: bcrypt.hashSync('12345', 10), // password is hashed
  },
];

module.exports = users;
