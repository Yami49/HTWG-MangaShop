/**
 * Nachricht.js
 *
 * @description :: Das Datenmodell für unser Kontaktformular (nur Name, E-Mail und Nachricht).
 */

module.exports = {
  attributes: {
    /**
     * @description Name des Absenders
     * @type {string}
     * @example Max Mustermann
     */
    name: {
      type: "string",
      required: true,
      maxLength: 60,
      description: "Der Name der Person, die das Kontaktformular ausfüllt",
      example: "Max Mustermann",
    },

    /**
     * @description E-Mail-Adresse des Absenders
     * @type {string}
     * @example max@beispiel.de
     */
    email: {
      type: "string",
      required: true,
      isEmail: true,
      maxLength: 100,
      description: "Die E-Mail-Adresse des Absenders",
      example: "max@beispiel.de",
    },

    /**
     * @description Inhalt der Nachricht
     * @type {string}
     * @example Ich interessiere mich für Ihr Manga-Angebot...
     */
    nachricht: {
      type: "string",
      required: true,
      columnType: "varchar(1000)",
      maxLength: 1000,
      description: "Die vom Benutzer verfasste Nachricht",
      example: "Ich habe eine Frage zu meiner Bestellung...",
    },
  },
};
