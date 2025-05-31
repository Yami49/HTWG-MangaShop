/**
 * BlogController
 *
 * @description :: Controller für Blogeinträge
 */

const BlogService = require('../services/BlogService');
const errors = require('../utils/errors');

module.exports = {
  /**
   * Gibt alle Blogeinträge zurück
   * Admins sehen alle, normale Nutzer nur aktive
   */
  find: async function (req, res) {
    try {
      const isAdmin = req.session.user?.istAdmin;
      const blogs = await BlogService.findAll({ includeInactive: isAdmin });
      return res.json(blogs);
    } catch (err) {
      sails.log.error('❌ Fehler beim Laden der Blogeinträge:', err);
      return res.serverError({ error: 'Fehler beim Laden der Blogeinträge.' });
    }
  },

  /**
   * Einzelnen Blogeintrag laden
   */
  findOne: async function (req, res) {
    try {
      const blog = await BlogService.findById(req.params.id);
      return res.json(blog);
    } catch (err) {
      sails.log.error('❌ Fehler beim Laden eines Blogeintrags:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Fehler beim Laden.' });
    }
  },

  /**
   * Blogeintrag erstellen
   */
  create: async function (req, res) {
    try {
      const { titel, inhalt, aktiv } = req.body;

      if (!titel || !inhalt) {
        return res.badRequest({ error: 'Titel und Inhalt sind erforderlich.' });
      }

      const newBlog = await BlogService.create({
        titel,
        inhalt,
        aktiv: aktiv !== undefined ? aktiv : true
      });

      return res.status(201).json(newBlog);
    } catch (err) {
      sails.log.error('❌ Fehler beim Erstellen des Blogeintrags:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Fehler beim Erstellen.' });
    }
  },

  /**
   * Blogeintrag aktualisieren
   */
  update: async function (req, res) {
    try {
      const updated = await BlogService.update(req.params.id, req.body);
      return res.json(updated);
    } catch (err) {
      sails.log.error('❌ Fehler beim Aktualisieren des Blogeintrags:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Fehler beim Aktualisieren.' });
    }
  },

  /**
   * Blogeintrag löschen
   */
  delete: async function (req, res) {
    try {
      await BlogService.remove(req.params.id);
      return res.ok();
    } catch (err) {
      sails.log.error('❌ Fehler beim Löschen des Blogeintrags:', err);
      return res.status(err.status || 500).json({ error: err.message || 'Fehler beim Löschen.' });
    }
  }
};