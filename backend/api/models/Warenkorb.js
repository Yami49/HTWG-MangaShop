/**
 * Warenkorb.js
 *
 * @description :: Datenmodell für aktive Warenkörbe im MangaShop.
 *                 Jeder Benutzer hat genau einen Warenkorb mit mehreren Produkten.
 */

module.exports = {
  attributes: {


    /**
     * @description Verknüpfter Benutzer (1:1).
     */
    benutzer: {
      model: 'benutzer',
      required: true,
      unique: true,
      description: 'Der Benutzer, dem dieser Warenkorb gehört.'
    },

    /**
     * @description Zugehörige Produkte im Warenkorb (n:m via CartItem).
     */
    produkte: {
      collection: 'cartitem',
      via: 'warenkorb',
      description: 'Produkte, die sich aktuell im Warenkorb befinden.'
    },

    /**
     * @description Verknüpfte Zahlungsmethode (optional).
     */
    zahlung: {
      model: 'zahlung',
      description: 'Vom Benutzer gewählte Zahlungsmethode für diesen Warenkorb (optional).'
    }

  }
};
