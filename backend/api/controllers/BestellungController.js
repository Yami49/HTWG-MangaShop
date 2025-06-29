// BestellungController.js
module.exports = {
  checkout: async (req, res) => {
    try {
      const result = await BestellungService.checkoutCart(req)
      return res.status(201).json(result)
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message })
    }
  },
  adminList: async (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'Zugriff verweigert' })
  }

  // Bestellungen inkl. Benutzer & Artikel holen
  const bestellungen = await Bestellung.find()
    .populate('benutzer')
    .populate('artikel')

  // Artikel → Produkt referenzen auflösen
  for (const bestellung of bestellungen) {
    for (const artikel of bestellung.artikel) {
      artikel.produkt = await Produkt.findOne({ id: artikel.produkt })
    }
  }

  return res.json(bestellungen)
},

  updateStatus: async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    if (!['offen', 'bezahlt', 'storniert', 'versendet'].includes(status)) {
      return res.status(400).json({ error: 'Ungültiger Status' })
    }

    const updated = await Bestellung.updateOne({ id }).set({ status })
    return res.json(updated)
  }
}
