const Bestellung = require("../models/Bestellung");
const Produkt = require("../models/Produkt");

// BestellungController.js
module.exports = {
  checkout: async (req, res) => {
    try {
      const result = await BestellungService.checkoutCart(req);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  },
  adminList: async (req, res) => {
    if (!req.session.isAdmin) {
      return res.status(403).json({ error: "Zugriff verweigert" });
    }

    const bestellungen = await Bestellung.find()
      .populate("benutzer")
      .populate("artikel");

    // Artikel-IDs extrahieren
    for (const bestellung of bestellungen) {
      const artikelIds = bestellung.artikel.map((a) => a.id);

      // Bestellpositionen inkl. Produkt laden
      const artikelMitProdukt = await Bestellposition.find({
        id: artikelIds,
      }).populate("produkt");

      bestellung.artikel = artikelMitProdukt;
    }

    return res.json(bestellungen);
  },

  updateStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["offen", "bezahlt", "storniert", "versendet"].includes(status)) {
      return res.status(400).json({ error: "Ungültiger Status" });
    }

    const updated = await Bestellung.updateOne({ id }).set({ status });
    return res.json(updated);
  },
};
