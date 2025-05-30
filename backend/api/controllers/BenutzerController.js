/**
 * BenutzerController
 *
 * @description :: Server-side actions für Benutzerverwaltung.
 *                 Verwendet den BenutzerService zur Interaktion mit der Datenbank.
 *
 * @help        :: Siehe Sails.js-Dokumentation: https://sailsjs.com/docs/concepts/actions
 */
const errors = require('../utils/errors');

module.exports = {

  /**
   * `BenutzerController.findOne()`
   *
   * @description
   * Gibt einen Benutzer anhand seiner ID zurück.
   */
  findOne: async function (req, res) {
    try {
      const benutzer = await BenutzerService.findById(req);
      return res.json(benutzer);
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.findOne:', err);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

  /**
   * `BenutzerController.find()`
   *
   * @description
   * Gibt alle Benutzer zurück, optional mit Filter/Pagination.
   */
  find: async function (req, res) {
    try {
      const result = await BenutzerService.findAll(req);
      return res.json(result);
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.find:', err);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

  /**
   * `BenutzerController.patch()`
   *
   * @description
   * Aktualisiert einen Benutzer anhand der ID und übergebenen Felder.
   */
  patch: async function (req, res) {
    try {
      const aktualisiert = await BenutzerService.update(req);
      return res.json(aktualisiert);
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.patch:', err);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

  /**
   * `BenutzerController.destroy()`
   *
   * @description
   * Löscht einen Benutzer anhand seiner ID.
   */
  destroy: async function (req, res) {
    try {
      await BenutzerService.delete(req);
      return res.ok();
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.destroy:', err);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

  /**
   * `BenutzerController.count()`
   *
   * @description
   * Gibt die Anzahl aller registrierten Benutzer zurück.
   */
  count: async function (req, res) {
    try {
      const anzahl = await BenutzerService.count();
      return res.json({ count: anzahl });
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.count:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

    /**
   * `BenutzerController.register()`
   *
   * @description
   * Registriert einen neuen Benutzer mit gehashtem Passwort.
   * Gibt bei Erfolg den neuen Benutzer (ohne Passwort) zurück.
   */
  register: async function (req, res) {
    try {
      const benutzer = await BenutzerService.register(req);
      return res.status(201).json({ data: benutzer });
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.register:', err);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({ error: err.message || 'Registrierung fehlgeschlagen.' });
    }
  }

};
