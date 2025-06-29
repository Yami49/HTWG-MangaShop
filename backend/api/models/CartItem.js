/**
 * CartItem.js
 *
 * @description :: Einzelne Produktzeile innerhalb eines Warenkorbs.
 *                 Enthält Produktreferenz und gewünschte Menge.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    /**
     * @description Zugehöriger Warenkorb
     * @type {model}
     */
    warenkorb: {
      model: "warenkorb",
      required: true,
      description: "Referenz auf den zugehörigen Warenkorb.",
    },

    /**
     * @description Das Produkt
     * @type {model}
     */
    produkt: {
      model: "produkt",
      required: true,
      description: "Referenz auf das Produkt im Warenkorb.",
    },

    /**
     * @description Gewählte Menge des Produkts
     * @type {number}
     * @example 2
     */
    menge: {
      type: "number",
      required: true,
      min: 1,
      max: 1000,
      custom: (value) => Number.isInteger(value),
      description: "Anzahl des Produkts im Warenkorb.",
    },

    /**
     * @description Erstellungszeitpunkt
     * @type {ref}
     */
    erstelltAm: {
      type: "ref",
      columnType: "datetime",
      autoCreatedAt: true,
    },

    /**
     * @description Letzte Aktualisierung
     * @type {ref}
     */
    aktualisiertAm: {
      type: "ref",
      columnType: "datetime",
      autoUpdatedAt: true,
    },
  },
};
