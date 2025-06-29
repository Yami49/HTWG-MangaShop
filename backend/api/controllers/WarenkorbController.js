/**
 * WarenkorbController
 *
 * @description :: Controller für warenkorbbezogene Benutzeraktionen
 */

const WarenkorbService = require("../services/WarenkorbService");
const errors = require("../utils/errors");

module.exports = {
  getCart: async function (req, res) {
    try {
      const cart = await WarenkorbService.getCart(req);
      return res.json(cart);
    } catch (err) {
      sails.log.error("Fehler beim Abrufen des Warenkorbs:", err);
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Fehler beim Abrufen des Warenkorbs." });
    }
  },

  addItem: async function (req, res) {
    try {
      const cart = await WarenkorbService.addItem(req);
      return res.status(201).json(cart);
    } catch (err) {
      sails.log.error("Fehler beim Hinzufügen zum Warenkorb:", err);
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Fehler beim Hinzufügen." });
    }
  },

  updateItem: async function (req, res) {
    try {
      const cart = await WarenkorbService.updateQuantity(req);
      return res.json(cart);
    } catch (err) {
      sails.log.error("Fehler beim Aktualisieren der Menge im Warenkorb:", err);
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Fehler beim Aktualisieren." });
    }
  },

  removeItem: async function (req, res) {
    try {
      const cart = await WarenkorbService.removeItem(req);
      return res.json(cart);
    } catch (err) {
      sails.log.error("Fehler beim Entfernen aus dem Warenkorb:", err);
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Fehler beim Entfernen." });
    }
  },

  clearCart: async function (req, res) {
    try {
      await WarenkorbService.clearCart(req);
      return res.ok({ message: "Warenkorb geleert." });
    } catch (err) {
      sails.log.error("Fehler beim Leeren des Warenkorbs:", err);
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Fehler beim Leeren." });
    }
  },
};
