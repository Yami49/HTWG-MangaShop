/**
 * Policy Mappings
 * (sails.config.policies)
 */

module.exports.policies = {
  // Globale Default-Policy
  "*": "isLoggedIn",

  // Öffentliche Authentifizierung
  BenutzerController: {
    login: true,
    register: true,
    profil: "isLoggedIn",
    findOne: "isOwnerOrAdmin",
    find: "isAdmin",
    patch: "isOwnerOrAdmin",
    destroy: "isAdmin",
    count: "isAdmin",
  },

  BlogController: {
    // Admin-only Operationen
    create: "isAdmin",
    update: "isAdmin",
    delete: "isAdmin",
    findAll: "isAdmin",

    // Öffentlich freigegebene Lesefunktionen
    findPublic: true,
    findOnePublic: true,
  },

  KategorieController: {
    find: true, // öffentlich
    create: "isAdmin",
    patch: "isAdmin",
    destroy: "isAdmin",
  },

  NachrichtController: {
    create: true, // Kontaktformular öffentlich
    find: "isAdmin",
    findOne: "isAdmin",
    destroy: "isAdmin",
  },

  ProduktController: {
    find: true, // öffentlich (Shop)
    findOne: true,
    create: "isAdmin",
    patch: "isAdmin",
    destroy: "isAdmin",
    count: "isAdmin",
  },

  WarenkorbController: {
    getCart: "isLoggedIn",
    addItem: "isLoggedIn",
    updateItem: "isLoggedIn",
    removeItem: "isLoggedIn",
    clearCart: "isLoggedIn",
  },

  ZahlungController: {
    create: "isLoggedIn",
    find: "isLoggedIn",
    patch: "isLoggedIn",
    destroy: "isLoggedIn",
  },
};
