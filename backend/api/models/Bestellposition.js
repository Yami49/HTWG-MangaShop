module.exports = {
  attributes: {
    bestellung: {
      model: "bestellung",
      required: true,
    },
    produkt: {
      model: "produkt",
      required: true,
    },
    menge: {
      type: "number",
      required: true,
    },
    einzelpreis: {
      type: "number",
      columnType: "float",
      required: true,
    },
  },
};
