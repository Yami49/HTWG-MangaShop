// BestellungController.js
module.exports = {
  checkout: async (req, res) => {
    try {
      const result = await BestellungService.checkoutCart(req)
      return res.status(201).json(result)
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message })
    }
  }
}
