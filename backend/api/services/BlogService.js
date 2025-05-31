/**
 * BlogService.js
 *
 * @description :: Serverseitige Logik für Blogoperationen, ausgelagert aus dem Controller.
 */

module.exports = {
  /**
   * Alle aktiven Blogbeiträge (für User)
   */
  findActive: async () => {
    return await Blog.find({ aktiv: true }).sort('erstelltAm DESC');
  },

  /**
   * Alle Blogbeiträge (Admin)
   */
  findAll: async () => {
    return await Blog.find().sort('erstelltAm DESC');
  },

  /**
   * Einzelnen Beitrag erstellen
   */
  create: async ({ titel, inhalt, aktiv }) => {
    if (!titel || !inhalt) {
      throw new Error('Titel und Inhalt sind erforderlich.');
    }

    return await Blog.create({
      titel,
      inhalt,
      aktiv: aktiv !== undefined ? aktiv : true,
      erstelltAm: new Date(),
    }).fetch();
  },

  /**
   * Beitrag aktualisieren
   */
  update: async (id, { titel, inhalt, aktiv }) => {
    const updated = await Blog.updateOne({ id }).set({
      ...(titel && { titel }),
      ...(inhalt && { inhalt }),
      ...(aktiv !== undefined && { aktiv }),
    });

    if (!updated) {
      throw new Error('Beitrag nicht gefunden.');
    }

    return updated;
  },

  /**
   * Beitrag löschen
   */
  destroy: async (id) => {
    const deleted = await Blog.destroyOne({ id });
    if (!deleted) {
      throw new Error('Beitrag nicht gefunden.');
    }
    return deleted;
  }
};
