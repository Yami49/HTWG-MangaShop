/**
 * api/helpers/passwords/hash-password.js
 *
 * @description :: Helper zum Hashen von Passwörtern mit bcrypt
 */

const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Hash password',

  description: 'Hash ein Klartextpasswort sicher mit bcrypt.',

  inputs: {
    password: {
      type: 'string',
      required: true,
      description: 'Das Klartextpasswort, das gehasht werden soll.'
    }
  },

  fn: async function (inputs) {
    const saltRounds = 10;
    return await bcrypt.hash(inputs.password, saltRounds);
  }
};
