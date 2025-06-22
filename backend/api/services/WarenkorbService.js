/**
 * api/services/WarenkorbService.js
 *
 * @description :: Geschäftslogik für die Verwaltung von Warenkörben.
 */

const errors = require('../utils/errors');

module.exports = {
  /**
   * Ruft den Warenkorb eines Benutzers ab oder erstellt ihn, wenn nicht vorhanden.
   */
  getOrCreateCartForUser: async (benutzerId) => {
    if (!benutzerId) throw new errors.BadRequestError('Benutzer nicht angemeldet.');

    let cart = await Warenkorb.findOne({ benutzer: benutzerId }).populate('produkte');

    if (!cart) {
      cart = await Warenkorb.create({ benutzer: benutzerId }).fetch();
    }

    return await Warenkorb.findOne({ id: cart.id }).populate('produkte');
  },

  /**
   * Gibt den Warenkorb für einen Request zurück.
   */
  getCart: async (req) => {
    const benutzerId = req.session.userId;
    return await module.exports.getOrCreateCartForUser(benutzerId);
  },

  /**
   * Fügt ein Produkt zum Warenkorb hinzu oder erhöht die Menge.
   */
  addItem: async (req) => {
    const benutzerId = req.session.userId;
    const { produkt, menge } = req.body;

    if (!benutzerId || !produkt || !menge || menge <= 0) {
      throw new errors.BadRequestError('Ungültige Daten für Warenkorbposition.');
    }

    const cart = await module.exports.getOrCreateCartForUser(benutzerId);

    let item = await CartItem.findOne({ warenkorb: cart.id, produkt });

    if (item) {
      item = await CartItem.updateOne({ id: item.id }).set({
        menge: item.menge + menge
      });
    } else {
      item = await CartItem.create({
        warenkorb: cart.id,
        produkt,
        menge
      }).fetch();
    }

    return await module.exports.getOrCreateCartForUser(benutzerId);
  },

  /**
   * Aktualisiert die Menge eines Items im Warenkorb.
   */
  updateQuantity: async (req) => {
    const benutzerId = req.session.userId;
    const { itemId, menge } = req.body;

    if (!benutzerId || !itemId || menge < 1) {
      throw new errors.BadRequestError('Ungültige Daten.');
    }

    const cart = await Warenkorb.findOne({ benutzer: benutzerId });
    const item = await CartItem.findOne({ id: itemId });

    if (!cart || !item || String(item.warenkorb) !== String(cart.id)) {
      throw new errors.ForbiddenError('Zugriff verweigert.');
    }

    await CartItem.updateOne({ id: item.id }).set({ menge });

    return await module.exports.getOrCreateCartForUser(benutzerId);
  },

  /**
   * Entfernt ein Item aus dem Warenkorb.
   */
  removeItem: async (req) => {
    const benutzerId = req.session.userId;
    const { itemId } = req.params;

    const cart = await Warenkorb.findOne({ benutzer: benutzerId });
    const item = await CartItem.findOne({ id: itemId });

    if (!cart || !item || String(item.warenkorb) !== String(cart.id)) {
      throw new errors.ForbiddenError('Nicht gefunden oder nicht berechtigt.');
    }

    await CartItem.destroyOne({ id: item.id });

    return await module.exports.getOrCreateCartForUser(benutzerId);
  },

  /**
   * Leert den gesamten Warenkorb eines Benutzers.
   */
  clearCart: async (req) => {
    const benutzerId = req.session.userId;
    const cart = await Warenkorb.findOne({ benutzer: benutzerId });

    if (!cart) {
      throw new errors.NotFoundError('Warenkorb nicht gefunden.');
    }

    await CartItem.destroy({ warenkorb: cart.id });
  }
};