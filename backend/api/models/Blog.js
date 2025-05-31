/**
 * Blog.js
 *
 * @description :: Datenmodell für Blogbeiträge im MangaShop.
 *                 Beiträge können von Admins erstellt und für Nutzer sichtbar gemacht werden.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {

    /**
     * @description MongoDB-kompatibler Primärschlüssel
     */
    id: {
      type: 'string',
      columnName: '_id'
    },

    /**
     * @description Titel des Blogbeitrags
     * @type {string}
     * @example Neue Manga-Reihe im Shop!
     */
    titel: {
      type: 'string',
      required: true,
      maxLength: 150,
      description: 'Kurzer Titel des Blogbeitrags.',
      example: 'One Piece jetzt im Sortiment'
    },

    /**
     * @description Inhalt des Blogbeitrags (max. 1000 Zeichen)
     * @type {string}
     * @example Wir freuen uns, euch mitteilen zu können...
     */
    inhalt: {
      type: 'string',
      required: true,
      maxLength: 1000,
      description: 'Hauptinhalt des Beitrags, begrenzt auf 1000 Zeichen.',
      example: 'Wir freuen uns, euch mitteilen zu können, dass...'
    },

    /**
     * @description Gibt an, ob der Beitrag öffentlich sichtbar ist
     * @type {boolean}
     * @default true
     */
    aktiv: {
      type: 'boolean',
      defaultsTo: true,
      description: 'Nur aktive Beiträge sind für Nutzer sichtbar.'
    },

    /**
     * @description Erstellungszeitpunkt (muss beim Erstellen manuell gesetzt werden)
     * @type {ref} datetime
     * @example 2025-06-01T12:34:56Z
     */
    erstelltAm: {
      type: 'ref',
      columnType: 'datetime',
      required: true,
      description: 'Zeitpunkt der Erstellung des Blogeintrags.'
    }
  }
};