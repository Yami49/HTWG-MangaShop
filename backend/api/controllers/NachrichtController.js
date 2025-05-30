/**
 * NachrichtController
 *
 * @description :: Server-side actions für Kontakt-Nachrichten.
 *                 Dieser Controller verwaltet Routing und ruft den NachrichtService auf,
 *                 um mit der Datenbank zu interagieren.
 *
 * @help        :: Siehe Sails.js-Dokumentation: https://sailsjs.com/docs/concepts/actions
 */
const errors = require('../utils/errors');

module.exports = {

  /**
   * `NachrichtController.create()`
   *
   * @description
   * Erstellt eine neue Kontakt-Nachricht über den Service.
   *
   * @param {Request} req - HTTP-Request mit Nachrichtdaten.
   * @param {Response} res - HTTP-Response mit Antwort oder Fehler.
   */
  create: async function (req, res) {
    try {
      const neueNachricht = await NachrichtService.create(req);
      return res.status(201).json({ data: neueNachricht });
    } catch (err) {
      sails.log.error('❌ Nachricht erstellen fehlgeschlagen:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({ error: 'Ein unerwarteter Fehler ist aufgetreten.' });
    }
  },

  /**
   * `NachrichtController.find()`
   *
   * @description
   * Gibt alle gespeicherten Kontakt-Nachrichten zurück.
   */
  find: async function (req, res) {
    try {
      const nachrichten = await NachrichtService.findAll();
      return res.status(200).json({ data: nachrichten });
    } catch (err) {
      sails.log.error('❌ Nachrichten abrufen fehlgeschlagen:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({ error: 'Ein unerwarteter Fehler ist aufgetreten.' });
    }
  },

  /**
   * `NachrichtController.findOne()`
   *
   * @description
   * Gibt eine einzelne Kontakt-Nachricht anhand der ID zurück.
   */
  findOne: async function (req, res) {
    try {
      const nachricht = await NachrichtService.findOne(req);
      return res.status(200).json({ data: nachricht });
    } catch (err) {
      sails.log.error('❌ Nachricht abrufen fehlgeschlagen:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({ error: 'Ein unerwarteter Fehler ist aufgetreten.' });
    }
  },

  /**
   * `NachrichtController.destroy()`
   *
   * @description
   * Löscht eine Kontakt-Nachricht anhand der ID.
   */
  destroy: async function (req, res) {
    try {
      await NachrichtService.destroy(req);
      return res.ok();
    } catch (err) {
      sails.log.error('❌ Nachricht löschen fehlgeschlagen:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({ error: 'Ein unerwarteter Fehler ist aufgetreten.' });
    }
  }

};
