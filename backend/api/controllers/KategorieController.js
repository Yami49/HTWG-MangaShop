/**
 * KategorieController
 *
 * @description :: Aktionen zur Verwaltung von Manga-Kategorien.
 */
const errors = require("../utils/errors");

module.exports = {
  /**
   * Neue Kategorie erstellen
   */
  create: async function (req, res) {
    try {
      const kategorie = await KategorieService.createKategorie(req);
      return res.status(201).json(kategorie);
    } catch (err) {
      sails.log.error("❌ Kategorie erstellen fehlgeschlagen:", err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({
        error: "Ein unerwarteter Fehler ist aufgetreten.",
      });
    }
  },

  /**
   * Alle Kategorien abrufen
   */
  find: async function (req, res) {
    try {
      const kategorien = await KategorieService.findAllKategorien();
      return res.json(kategorien);
    } catch (err) {
      sails.log.error("❌ Kategorien laden fehlgeschlagen:", err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({
        error: "Ein unerwarteter Fehler ist aufgetreten.",
      });
    }
  },

  /**
   * Kategorie bearbeiten (PATCH)
   */
  patch: async function (req, res) {
    try {
      const kategorie = await KategorieService.updateKategorie(req);
      return res.json(kategorie);
    } catch (err) {
      sails.log.error(
        "❌ Kategorie aktualisieren fehlgeschlagen:",
        err.message,
      );
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError({
        error: "Ein unerwarteter Fehler ist aufgetreten.",
      });
    }
  },

  /**
   * Kategorie löschen
   */
  destroy: async function (req, res) {
    console.log("🧪 DELETE params:", req.params);

    try {
      await KategorieService.deleteKategorie(req);
      return res.ok();
    } catch (err) {
      sails.log.error("❌ Kategorie löschen fehlgeschlagen:", err.message);
      return res.serverError({ error: err.message });
    }
  },
};
