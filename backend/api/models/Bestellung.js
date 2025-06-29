// api/models/Bestellung.js
module.exports = {
  attributes: {
    benutzer: {
      model: "benutzer",
      required: true,
    },
    artikel: {
      collection: "bestellposition",
      via: "bestellung",
    },
    gesamtpreis: {
      type: "number",
      columnType: "float",
      required: true,
    },
    status: {
      type: "string",
      isIn: ["offen", "bezahlt", "storniert", "versendet"],
      defaultsTo: "offen",
    },

    adresse: {
      type: "json",
      columnType: "object",
    },
    zahlung: {
      type: "string",
      isIn: ["paypal", "kreditkarte", "ueberweisung"],
      required: true,
    },
  },
};
