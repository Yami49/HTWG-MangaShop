/**
 * NachrichtService
 *
 * @description :: Service zur Verwaltung von Kontakt-Nachrichten.
 *                 Kapselt Datenbankzugriffe und Validierung für Erstellen, Abrufen und Löschen.
 *
 * @help        :: Siehe Sails.js-Dokumentation unter https://sailsjs.com/docs/concepts/services
 */

const errors = require('../utils/errors');

module.exports = {

  /**
   * `NachrichtService.create()`
   *
   * @description
   * Erstellt eine neue Kontakt-Nachricht in der Datenbank.
   *
   * @param {object} req - Das Sails.js-Request-Objekt
   *
   * @throws {BadRequestError} Wenn Pflichtfelder fehlen
   * @returns {Promise<Object>} Die neu erstellte Nachricht
   */
  create: async function (req) {
    const { name, email, nachricht } = req.body;

    if (!name) {
      throw new errors.BadRequestError('Name ist erforderlich.');
    }

    if (!email) {
      throw new errors.BadRequestError('E-Mail ist erforderlich.');
    }

    if (!nachricht) {
      throw new errors.BadRequestError('Nachricht ist erforderlich.');
    }

    return await ContactMessage.create({
      name,
      email,
      nachricht
    }).fetch();
  },

  /**
   * `NachrichtService.findAll()`
   *
   * @description
   * Gibt alle gespeicherten Nachrichten zurück.
   *
   * @returns {Promise<Array>} Liste aller Kontakt-Nachrichten
   */
  findAll: async function () {
    return await ContactMessage.find();
  },

  /**
   * `NachrichtService.findOne()`
   *
   * @description
   * Gibt eine Nachricht anhand der ID zurück.
   *
   * @param {object} req - Das Sails.js-Request-Objekt
   * @throws {NotFoundError} Wenn keine Nachricht gefunden wurde
   * @returns {Promise<Object>} Die gefundene Nachricht
   */
  findOne: async function (req) {
    const { id } = req.params;
    const nachricht = await ContactMessage.findOne({ id });

    if (!nachricht) {
      throw new errors.NotFoundError('Nachricht nicht gefunden.');
    }

    return nachricht;
  },

  /**
   * `NachrichtService.destroy()`
   *
   * @description
   * Löscht eine Nachricht anhand der ID.
   *
   * @param {object} req - Das Sails.js-Request-Objekt
   * @throws {NotFoundError} Wenn keine Nachricht mit der ID existiert
   * @returns {Promise<void>}
   */
  destroy: async function (req) {
    const { id } = req.params;
    const deleted = await ContactMessage.destroyOne({ id });

    if (!deleted) {
      throw new errors.NotFoundError('Nachricht konnte nicht gelöscht werden (nicht gefunden).');
    }
  }

};
