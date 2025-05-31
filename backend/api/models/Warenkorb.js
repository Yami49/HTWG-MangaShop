/**
 * Warenkorb.js
 *
 * @description :: Datenmodell für aktive Warenkörbe im MangaShop.
 *                 Jeder Benutzer kann genau einen Warenkorb mit mehreren Produkten haben.
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
     * @description Verknüpfter Benutzer
     * @type {ref}
     */
    benutzer: {
      model: 'benutzer',
      required: true,
      unique: true,
      description: 'Der Benutzer, dem dieser Warenkorb gehört.'
    },

    /**
     * @description Zugehörige Produkte im Warenkorb (Relation)
     * @type {collection}
     */
    produkte: {
      collection: 'cartitem',
      via: 'warenkorb',
      description: 'Produkte, die sich aktuell im Warenkorb befinden.'
    },

    /**
     * @description Zeitpunkt der letzten Aktualisierung
     * @type {ref}
     */
    aktualisiertAm: {
      type: 'ref',
      columnType: 'datetime',
      autoUpdatedAt: true,
      description: 'Zuletzt bearbeitet am.'
    },

    /**
     * @description Zeitpunkt der Erstellung
     * @type {ref}
     */
    erstelltAm: {
      type: 'ref',
      columnType: 'datetime',
      autoCreatedAt: true,
      description: 'Zeitpunkt, zu dem der Warenkorb erstellt wurde.'
    }
  }
};
