/**
 * BlogService.js
 *
 * @description :: Serverseitige Logik für Blogoperationen, ausgelagert aus dem Controller.
 */

const errors = require('../utils/errors');

module.exports = {
  /**
   * Alle Blogbeiträge abrufen (je nach Sichtbarkeit)
   * @param {Object} options - { includeInactive: boolean }
   */
  findAll: async ({ includeInactive = false } = {}) => {
    const criteria = includeInactive ? {} : { aktiv: true };
    return await Blog.find(criteria).sort('erstelltAm DESC');
  },

  /**
   * Einzelnen Blogeintrag anhand der ID finden
   */
  findById: async (id) => {
    const blog = await Blog.findOne({ id });
    if (!blog) {
      throw new errors.NotFoundError('Blogeintrag nicht gefunden.');
    }
    return blog;
  },

  /**
   * Neuen Blogeintrag erstellen
   */
  create: async ({ titel, inhalt, aktiv }) => {
    if (!titel || !inhalt) {
      throw new errors.BadRequestError('Titel und Inhalt sind erforderlich.');
    }

    if (titel.length > 150) {
      throw new errors.BadRequestError('Titel darf maximal 150 Zeichen lang sein.');
    }

    if (inhalt.length > 1000) {
      throw new errors.BadRequestError('Inhalt darf maximal 1000 Zeichen lang sein.');
    }

    const neuerBlog = await Blog.create({
      titel,
      inhalt,
      aktiv: aktiv !== undefined ? aktiv : true,
      erstelltAm: new Date()
    }).fetch();

    return neuerBlog;
  },

  /**
   * Vorhandenen Blogeintrag aktualisieren
   */
  update: async (id, { titel, inhalt, aktiv }) => {
    const blog = await Blog.findOne({ id });
    if (!blog) {
      throw new errors.NotFoundError('Blogeintrag nicht gefunden.');
    }

    const payload = {};

    if (titel !== undefined) {
      if (titel.length > 150) {
        throw new errors.BadRequestError('Titel darf maximal 150 Zeichen lang sein.');
      }
      payload.titel = titel;
    }

    if (inhalt !== undefined) {
      if (inhalt.length > 1000) {
        throw new errors.BadRequestError('Inhalt darf maximal 1000 Zeichen lang sein.');
      }
      payload.inhalt = inhalt;
    }

    if (aktiv !== undefined) {
      payload.aktiv = aktiv;
    }

    const aktualisiert = await Blog.updateOne({ id }).set(payload);

    if (!aktualisiert) {
      throw new errors.NotFoundError('Blogeintrag konnte nicht aktualisiert werden.');
    }

    return aktualisiert;
  },

  /**
   * Blogeintrag löschen
   */
  remove: async (id) => {
    const gelöscht = await Blog.destroyOne({ id });
    if (!gelöscht) {
      throw new errors.NotFoundError('Blogeintrag konnte nicht gelöscht werden.');
    }
    return gelöscht;
  }
};