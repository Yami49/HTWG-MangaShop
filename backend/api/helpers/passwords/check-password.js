const bcrypt = require("bcrypt");

module.exports = {
  friendlyName: "Check password",

  description: "Vergleicht ein Klartextpasswort mit dem gehashten Passwort",

  inputs: {
    plainPassword: {
      type: "string",
      required: true,
    },
    hashedPassword: {
      type: "string",
      required: true,
    },
  },

  fn: async function ({ plainPassword, hashedPassword }) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },
};
