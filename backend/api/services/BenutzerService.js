/**
 * BenutzerController
 *
 * @description :: Aktionen zur Benutzerverwaltung.
 */
const errors = require('../utils/errors');

module.exports = {
  find: async function (req, res) {
    try {
      const result = await BenutzerService.findAll(req);
      return res.json(result);
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.find:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Fehler beim Laden der Benutzer.' });
    }
  },

  findOne: async function (req, res) {
    try {
      const benutzer = await BenutzerService.findById(req);
      return res.json({ data: benutzer });
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.findOne:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Benutzer konnte nicht geladen werden.' });
    }
  },

  count: async function (req, res) {
    try {
      const anzahl = await BenutzerService.count();
      return res.json({ count: anzahl });
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.count:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Zählen fehlgeschlagen.' });
    }
  },

  patch: async function (req, res) {
    try {
      const aktualisiert = await BenutzerService.update(req);
      return res.json({ data: aktualisiert });
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.patch:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Aktualisierung fehlgeschlagen.' });
    }
  },

  destroy: async function (req, res) {
    try {
      await BenutzerService.delete(req);
      return res.ok();
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.destroy:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Löschen fehlgeschlagen.' });
    }
  },

  register: async function (req, res) {
    try {
      const benutzer = await BenutzerService.register(req);
      return res.status(201).json({ data: benutzer });
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.register:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Registrierung fehlgeschlagen.' });
    }
  },

  login: async function (req, res) {
    try {
      const benutzer = await BenutzerService.login(req);
      req.session.userId = benutzer.id;
      req.session.user = benutzer;
      return res.json({ data: benutzer });
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.login:', err);
      return res.status(401).json({ error: err.message || 'Login fehlgeschlagen.' });
    }
  },

  profil: async function (req, res) {
    try {
      const id = req.session.userId;
      if (!id) {
        return res.status(401).json({ error: 'Nicht eingeloggt.' });
      }

      const benutzer = await Benutzer.findOne({ id });
      if (!benutzer) {
        return res.status(404).json({ error: 'Benutzer nicht gefunden.' });
      }

      delete benutzer.passwort;
      return res.json({ data: benutzer });
    } catch (err) {
      sails.log.error('❌ Fehler in BenutzerController.profil:', err);
      return res.status(500).json({ error: 'Profil konnte nicht geladen werden.' });
    }
  }
};
