/**
 * api/services/ZahlungService.js
 *
 * @description :: Service zum Verwalten von Zahlungsmethoden für Benutzer.
 */
const errors = require("../utils/errors");

module.exports = {
  /**
   * Zahlung erstellen
   */
  erstelleZahlung: async function (req) {
    const {
      zahlungsart,
      iban,
      kreditkartennummer,
      ablaufdatum,
      cvc,
      paypalEmail,
    } = req.body;

    const sessionUserId = req.session.userId;

    if (!sessionUserId) {
      return errors.UnauthorizedError("Nicht authentifiziert.");
    }

    // Validierung
    if (!zahlungsart) {
      return errors.BadRequestError("Zahlungsart ist erforderlich.");
    }

    if (zahlungsart === "bank transfer" && !iban) {
      return errors.BadRequestError(
        "IBAN ist für Banküberweisungen erforderlich.",
      );
    }

    if (
      zahlungsart === "credit card" &&
      (!kreditkartennummer || !ablaufdatum || !cvc)
    ) {
      return errors.BadRequestError("Kreditkartendaten sind unvollständig.");
    }

    if (zahlungsart === "paypal" && !paypalEmail) {
      return errors.BadRequestError("PayPal E-Mail ist erforderlich.");
    }

    const neueZahlung = await Zahlung.create({
      zahlungsart,
      iban: zahlungsart === "bank transfer" ? iban : null,
      kreditkartennummer:
        zahlungsart === "credit card" ? kreditkartennummer : null,
      ablaufdatum: zahlungsart === "credit card" ? ablaufdatum : null,
      cvc: zahlungsart === "credit card" ? cvc : null,
      paypalEmail: zahlungsart === "paypal" ? paypalEmail : null,
      istFuerBestellung: false,
      benutzer: sessionUserId,
    }).fetch();

    return neueZahlung;
  },

  /**
   * Zahlungen eines Benutzers finden
   */
  findeZahlungenVonBenutzer: async function (req) {
    const sessionUserId = req.session.userId;

    if (!sessionUserId) {
      return errors.UnauthorizedError("Nicht authentifiziert.");
    }

    const zahlungen = await Zahlung.find({ benutzer: sessionUserId });

    if (!zahlungen || zahlungen.length === 0) {
      return errors.NotFoundError("Keine Zahlungen gefunden.");
    }

    return zahlungen;
  },

  /**
   * Zahlung aktualisieren
   */
  aktualisiereZahlung: async function (req) {
    const id = req.params.id;
    const sessionUserId = req.session.userId;

    const {
      zahlungsart,
      iban,
      kreditkartennummer,
      ablaufdatum,
      cvc,
      paypalEmail,
    } = req.body;

    const zahlung = await Zahlung.findOne({ id });
    if (!zahlung) {
      return errors.NotFoundError("Zahlung nicht gefunden.");
    }

    if (zahlung.benutzer !== sessionUserId && !req.session.user.isAdmin) {
      return errors.ForbiddenError(
        "Keine Berechtigung zur Änderung dieser Zahlung.",
      );
    }

    const aktualisierteZahlung = await Zahlung.updateOne({ id }).set({
      zahlungsart,
      iban: zahlungsart === "bank transfer" ? iban : zahlung.iban,
      kreditkartennummer:
        zahlungsart === "credit card"
          ? kreditkartennummer
          : zahlung.kreditkartennummer,
      ablaufdatum:
        zahlungsart === "credit card" ? ablaufdatum : zahlung.ablaufdatum,
      cvc: zahlungsart === "credit card" ? cvc : zahlung.cvc,
      paypalEmail: zahlungsart === "paypal" ? paypalEmail : zahlung.paypalEmail,
    });

    if (!aktualisierteZahlung) {
      throw new errors.NotFoundError(
        "Zahlung konnte nicht aktualisiert werden.",
      );
    }

    return aktualisierteZahlung;
  },

  /**
   * Zahlung löschen
   */
  loescheZahlung: async function (req) {
    const id = req.params.id;
    const sessionUserId = req.session.userId;

    const zahlung = await Zahlung.findOne({ id });
    if (!zahlung) {
      return errors.NotFoundError("Zahlung nicht gefunden.");
    }

    if (zahlung.benutzer !== sessionUserId && !req.session.user.isAdmin) {
      return errors.ForbiddenError(
        "Keine Berechtigung zum Löschen dieser Zahlung.",
      );
    }

    const geloeschteZahlung = await Zahlung.destroy({ id }).fetch();

    if (!geloeschteZahlung) {
      throw new errors.NotFoundError("Zahlung konnte nicht gelöscht werden.");
    }

    return geloeschteZahlung;
  },
};
