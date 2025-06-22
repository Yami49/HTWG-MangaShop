/**
 * ZahlungController
 *
 * @description :: Server-side actions für Zahlungsmanagement (erstellen, finden, aktualisieren, löschen).
 * @help        :: Siehe Sails.js Dokumentation: https://sailsjs.com/docs/concepts/actions
 */
const errors = require('../utils/errors');

module.exports = {

  /**
   * Zahlung erstellen
   *
   * @description
   * Erstellt eine neue Zahlungsmethode für den aktuell eingeloggten Benutzer.
   *
   * @param {Request} req - Der eingehende HTTP-Request (Body mit Zahlungsdaten).
   * @param {Response} res - HTTP-Response mit Erfolg oder Fehler.
   * @returns {Response} 201 mit Zahlungsobjekt oder Fehlerstatus.
   */
  create: async function (req, res) {
    try {
      const neueZahlung = await ZahlungService.erstelleZahlung(req);
      return res.status(201).json(neueZahlung);
    } catch (err) {
      sails.log.error('Fehler beim Erstellen der Zahlung:', err);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({ error: 'Beim Erstellen der Zahlung ist ein Fehler aufgetreten.' });
    }
  },

  /**
   * Zahlungen eines Benutzers abrufen
   *
   * @description
   * Gibt alle Zahlungsmethoden des eingeloggten Benutzers zurück.
   *
   * @param {Request} req - HTTP-Request mit Session (req.session.userId).
   * @param {Response} res - HTTP-Response mit Liste der Zahlungen.
   * @returns {Response} 200 OK oder Fehlerstatus.
   */
  find: async function (req, res) {
    try {
      const zahlungen = await ZahlungService.findeZahlungenVonBenutzer(req);
      return res.ok(zahlungen);
    } catch (err) {
      sails.log.error('Fehler beim Laden der Zahlungen:', err);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({ error: 'Fehler beim Abrufen der Zahlungen.' });
    }
  },

  /**
   * Zahlungsmethode aktualisieren
   *
   * @description
   * Aktualisiert eine bestimmte Zahlung für den eingeloggten Benutzer.
   *
   * @param {Request} req - HTTP-Request mit Zahlungsdaten und ID in Param.
   * @param {Response} res - HTTP-Response mit aktualisierter Zahlung.
   */
  patch: async function (req, res) {
    try {
      const aktualisierteZahlung = await ZahlungService.aktualisiereZahlung(req);
      return res.ok(aktualisierteZahlung);
    } catch (err) {
      sails.log.error('Fehler beim Aktualisieren der Zahlung:', err);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({ error: 'Fehler beim Aktualisieren der Zahlung.' });
    }
  },

  /**
   * Zahlungsmethode löschen
   *
   * @description
   * Löscht eine gespeicherte Zahlungsmethode anhand ihrer ID.
   *
   * @param {Request} req - HTTP-Request mit ID in Param.
   * @param {Response} res - HTTP-Response mit Erfolg oder Fehler.
   */
  destroy: async function (req, res) {
    try {
      const geloeschteZahlung = await ZahlungService.loescheZahlung(req);
      return res.ok(geloeschteZahlung);
    } catch (err) {
      sails.log.error('Fehler beim Löschen der Zahlung:', err);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({ error: 'Fehler beim Löschen der Zahlung.' });
    }
  }
};
