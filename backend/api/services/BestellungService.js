const errors = require('../utils/errors')

module.exports = {
  /**
   * Erstellt eine Bestellung basierend auf dem aktuellen Warenkorb des Benutzers.
   * @param {Request} req - Express/Sails Request mit Session und Body (adresse, zahlung)
   */
  checkoutCart: async (req) => {
    const benutzerId = req.session.userId
    const { adresse, zahlung } = req.body

    if (!benutzerId) {
      throw new errors.BadRequestError('Nicht eingeloggt.')
    }

    if (!adresse || !zahlung) {
      throw new errors.BadRequestError('Adresse oder Zahlungsmethode fehlt.')
    }

    // Warenkorb inkl. CartItems laden
    const warenkorb = await Warenkorb.findOne({ benutzer: benutzerId }).populate('produkte')
    if (!warenkorb || warenkorb.produkte.length === 0) {
      throw new errors.BadRequestError('Der Warenkorb ist leer.')
    }

    // Artikel extrahieren und Preise holen
    const artikel = await Promise.all(warenkorb.produkte.map(async (item) => {
      const produkt = await Produkt.findOne({ id: item.produkt })
      if (!produkt) throw new errors.BadRequestError(`Produkt ${item.produkt} existiert nicht mehr.`)

      return {
        produktId: produkt.id,
        menge: item.menge,
        einzelpreis: produkt.preis
      }
    }))

    const gesamtpreis = artikel.reduce((sum, a) => sum + a.menge * a.einzelpreis, 0)

    // Bestellung speichern
    const bestellung = await Bestellung.create({
      benutzer: benutzerId,
      adresse,
      zahlung,
      gesamtpreis
    }).fetch()

    // Bestellpositionen anlegen
    for (const a of artikel) {
      await Bestellposition.create({
        bestellung: bestellung.id,
        produkt: a.produktId,
        menge: a.menge,
        einzelpreis: a.einzelpreis
      })
    }

    // Warenkorb leeren
    await CartItem.destroy({ warenkorb: warenkorb.id })

    return bestellung
  }
}