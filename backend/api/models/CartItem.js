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
     * @type {ref}
     */
    warenkorb: {
      model: 'warenkorb',
      required: true,
      description: 'Referenz auf den zugehörigen Warenkorb.'
    },

    /**
     * @description Das Produkt
     * @type {ref}
     */
    produkt: {
      model: 'produkt',
      required: true,
      description: 'Referenz auf das Produkt im Warenkorb.'
    },

    /**
     * @description Gewählte Menge des Produkts
     * @type {number}
     * @example 2
     */
    menge: {
      type: 'number',
      required: true,
      min: 1,
      max: 1000,
      custom: (value) => Number.isInteger(value),
      description: 'Anzahl des Produkts im Warenkorb.'
    }
  }
};
