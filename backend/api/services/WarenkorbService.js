/**
 * WarenkorbService.js
 *
 * @description :: Geschäftslogik für die Verwaltung von Warenkörben.
 */

const errors = require('../utils/errors');

module.exports = {
  /**
   * Ruft den Warenkorb eines Benutzers ab oder erstellt ihn, wenn nicht vorhanden.
   */
  getOrCreateCartForUser: async (userId) => {
    if (!userId) throw new errors.BadRequestError('Benutzer nicht angemeldet.');

    let cart = await Warenkorb.findOne({ user: userId }).populate('items');

    if (!cart) {
      cart = await Warenkorb.create({ user: userId }).fetch();
    }

    return await Warenkorb.findOne({ id: cart.id }).populate('items');
  },

  /**
   * Fügt ein Produkt zum Warenkorb hinzu oder erhöht die Menge.
   */
  addItemToCart: async (userId, { produkt, menge }) => {
    if (!userId || !produkt || !menge || menge <= 0) {
      throw new errors.BadRequestError('Ungültige Daten für Warenkorbposition.');
    }

    const cart = await module.exports.getOrCreateCartForUser(userId);

    // Prüfen, ob das Produkt bereits im Warenkorb vorhanden ist
    let item = await CartItem.findOne({ warenkorb: cart.id, produkt });

    if (item) {
      // Menge erhöhen
      item = await CartItem.updateOne({ id: item.id }).set({
        menge: item.menge + menge
      });
    } else {
      // Neue Position erstellen
      item = await CartItem.create({
        warenkorb: cart.id,
        produkt,
        menge
      }).fetch();
    }

    return item;
  },

  /**
   * Aktualisiert die Menge eines Items im Warenkorb.
   */
  updateItemQuantity: async (userId, itemId, menge) => {
    if (!userId || !itemId || menge < 1) {
      throw new errors.BadRequestError('Ungültige Daten.');
    }

    const cart = await Warenkorb.findOne({ user: userId });
    const item = await CartItem.findOne({ id: itemId });

    if (!cart || !item || item.warenkorb !== cart.id) {
      throw new errors.BadRequestError('Zugriff verweigert.');
    }

    return await CartItem.updateOne({ id: item.id }).set({ menge });
  },

  /**
   * Entfernt ein Item aus dem Warenkorb.
   */
  removeItemFromCart: async (userId, itemId) => {
    const cart = await Warenkorb.findOne({ user: userId });
    const item = await CartItem.findOne({ id: itemId });

    if (!cart || !item || item.warenkorb !== cart.id) {
      throw new errors.BadRequestError('Nicht gefunden oder nicht berechtigt.');
    }

    await CartItem.destroyOne({ id: item.id });
  },

  /**
   * Leert den gesamten Warenkorb eines Benutzers.
   */
  clearCart: async (userId) => {
    const cart = await Warenkorb.findOne({ user: userId });

    if (!cart) {
      throw new errors.BadRequestError('Warenkorb nicht gefunden.');
    }

    await CartItem.destroy({ warenkorb: cart.id });
  }
};