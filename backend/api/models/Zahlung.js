/**
 * Zahlung.js
 *
 * @description :: Datenmodell zur Verwaltung verschiedener Zahlungsmethoden
 *                (Kreditkarte, Banküberweisung, PayPal).
 */

module.exports = {
  attributes: {

    id: {
  type: 'string',
  columnName: '_id'
},
    /**
     * @description Zahlungsart (Kreditkarte, Überweisung, PayPal)
     * @type {string}
     * @example 'credit card', 'paypal', 'bank transfer'
     */
    zahlungsart: {
      type: 'string',
      required: true,
      isIn: ['credit card', 'bank transfer', 'paypal'],
      example: 'credit card'
    },

    /**
     * @description IBAN bei Banküberweisung
     * @type {string}
     * @example 'DE89370400440532013000'
     */
    iban: {
      type: 'string',
      allowNull: true,
      minLength: 15,
      maxLength: 34,
      description: 'IBAN bei Banküberweisung. Beispiel: DE89370400440532013000'
    },

    /**
     * @description Kreditkartennummer (nur relevant bei Kreditkartenzahlung)
     * @type {string}
     * @example '1234567890123456'
     */
    kreditkartennummer: {
      type: 'string',
      allowNull: true,
      minLength: 13,
      maxLength: 19,
      description: 'Nur bei Kreditkartenzahlung, z. B. 1234567890123456'
    },

    /**
     * @description Ablaufdatum der Kreditkarte
     * @type {ref}
     * @example '2025-12-31'
     */
    ablaufdatum: {
      type: 'ref',
      columnType: 'date',
      description: 'Ablaufdatum im Format YYYY-MM-DD'
    },

    /**
     * @description Kartenprüfnummer (CVC)
     * @type {string}
     * @example '123'
     */
    cvc: {
      type: 'string',
      allowNull: true,
      minLength: 3,
      maxLength: 4,
      description: 'Nur bei Kreditkartenzahlung, z. B. 123'
    },

    /**
     * @description PayPal E-Mail-Adresse
     * @type {string}
     * @example 'user@paypal.com'
     */
    paypalEmail: {
      type: 'string',
      allowNull: true,
      isEmail: true,
      maxLength: 100,
      description: 'Nur bei PayPal-Zahlung, z. B. user@paypal.com'
    },

    /**
     * @description Gibt an, ob der Eintrag zu einer Bestellung gehört (Snapshot) oder dauerhaft beim User gespeichert ist.
     * @type {boolean}
     * @example true
     */
    istFuerBestellung: {
      type: 'boolean',
      required: true,
      description: 'Ob dieser Eintrag zur Bestellung (true) oder zur Benutzereinstellung (false) gehört.'
    },

    /**
     * @description Referenz zum zugehörigen Benutzer
     * @type {string}
     */
    benutzer: {
      model: 'Benutzer',
      required: true,
      description: 'Der Benutzer, dem diese Zahlungsart gehört.'
    },

    /**
     * @description Verknüpfte Bestellung (optional, wenn isForOrder = true)
     * @type {string}
     
    bestellung: {
      model: 'bestellung',
      unique: true,
      description: 'Verknüpfte Bestellung, falls diese Zahlung zu einer spezifischen Order gehört.'
    }*/
  }
};
