/**
 * Benutzer.js
 *
 * @description :: Datenmodell für Benutzer des MangaShops.
 *                 Beinhaltet Login-Daten, Rollen-Flag und optionale Relationen.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    /**
     * @description E-Mail-Adresse des Benutzers (Login-Name)
     * @type {string}
     * @example lisa@example.com
     */
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 100,
      example: "lisa@example.com",
    },

    /**
     * @description Gehashtes Passwort des Benutzers
     * @type {string}
     * @example $2a$10$7Xb... (bcrypt Hash)
     */
    passwort: {
      type: "string",
      required: true,
      protect: true,
      description: "Gehashtes Passwort (z. B. via bcrypt).",
      example: "$2a$10$7Xb...",
    },

    /**
     * @description Vorname des Benutzers
     * @type {string}
     * @example Lisa
     */
    vorname: {
      type: "string",
      required: true,
      maxLength: 50,
      example: "Lisa",
    },

    /**
     * @description Nachname des Benutzers
     * @type {string}
     * @example Sakamoto
     */
    nachname: {
      type: "string",
      required: true,
      maxLength: 50,
      example: "Sakamoto",
    },

    /**
     * @description Gibt an, ob der Benutzer Admin-Rechte hat
     * @type {boolean}
     * @example true
     */
    istAdmin: {
      type: "boolean",
      defaultsTo: false,
      description: "Flag, ob der Benutzer Administrator ist.",
    },

    // TODO: Relationen (Bestellungen, Adresse, Zahlungen) kannst du später ergänzen
  },
};
