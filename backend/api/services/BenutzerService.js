const errors = require('../utils/errors');

/**
 * BenutzerService
 *
 * @description :: Server-side Funktionen zur Verwaltung von Benutzern.
 */
module.exports = {

  /**
   * Registrierung eines neuen Benutzers
   */
  register: async function (req) {
    const { email, passwort, vorname, nachname } = req.body;

    if (!email || !passwort || !vorname || !nachname) {
      throw new errors.BadRequestError('Alle Felder sind erforderlich.');
    }

    const existiert = await Benutzer.findOne({ email });
    if (existiert) {
      throw new errors.ConflictError('E-Mail wird bereits verwendet.');
    }

    const hashed = await sails.helpers.passwords.hashPassword(passwort);

    const neuerBenutzer = await Benutzer.create({
      email,
      passwort: hashed,
      vorname,
      nachname,
      istAdmin: false
    }).fetch();

    delete neuerBenutzer.passwort;
    return neuerBenutzer;
  },

  /**
   * Ruft einen Benutzer anhand seiner ID ab
   */
  findById: async function (req) {
    const id = req.params.id;

    if (!id) {
      throw new errors.BadRequestError('Benutzer-ID ist erforderlich.');
    }

    const benutzer = await Benutzer.findOne({ id });

    if (!benutzer) {
      throw new errors.NotFoundError('Benutzer nicht gefunden.');
    }

    delete benutzer.passwort;
    return benutzer;
  },

  /**
   * Gibt alle Benutzer zurück (optional mit Filter/Pagination)
   */
  findAll: async function (req) {
    const { search, page, size } = extractUserFilters(req);

    const criteria = {
      where: {},
      sort: 'id ASC'
    };

    if (search) {
      criteria.where.or = [
        { vorname: { contains: search } },
        { nachname: { contains: search } },
        { email: { contains: search } }
      ];
    }

    if (page && size) {
      criteria.limit = size;
      criteria.skip = (page - 1) * size;
    }

    const benutzer = await Benutzer.find(criteria);
    const bereinigt = benutzer.map(b => {
      delete b.passwort;
      return b;
    });

    if (page && size) {
      const total = await Benutzer.count(criteria.where);
      return {
        benutzer: bereinigt,
        total,
        totalPages: Math.ceil(total / size),
        currentPage: page,
        hasMore: page < Math.ceil(total / size)
      };
    }

    return { benutzer: bereinigt, total: bereinigt.length };
  },

  /**
   * Aktualisiert einen bestehenden Benutzer anhand seiner ID
   */
  update: async function (req) {
    const id = req.params.id;

    if (!id) {
      throw new errors.BadRequestError('Benutzer-ID ist erforderlich.');
    }

    const existierenderBenutzer = await Benutzer.findOne({ id });
    if (!existierenderBenutzer) {
      throw new errors.NotFoundError('Benutzer nicht gefunden.');
    }

    const {
      email,
      passwort,
      vorname,
      nachname,
      istAdmin
    } = req.body;

    // E-Mail-Check (wenn geändert)
    if (email && email !== existierenderBenutzer.email) {
      const duplicate = await Benutzer.findOne({ email });
      if (duplicate) {
        throw new errors.ConflictError('E-Mail wird bereits verwendet.');
      }
    }

    let neuesPasswort = existierenderBenutzer.passwort;
    if (passwort) {
      neuesPasswort = await sails.helpers.passwords.hashPassword(passwort);
    }

    const aktualisiert = await Benutzer.updateOne({ id }).set({
      email: email || existierenderBenutzer.email,
      passwort: neuesPasswort,
      vorname: vorname || existierenderBenutzer.vorname,
      nachname: nachname || existierenderBenutzer.nachname,
      istAdmin: typeof istAdmin === 'boolean' ? istAdmin : existierenderBenutzer.istAdmin
    });

    delete aktualisiert.passwort;
    return aktualisiert;
  },

  /**
   * Löscht einen Benutzer anhand seiner ID
   */
  delete: async function (req) {
    const id = req.params.id;

    if (!id) {
      throw new errors.BadRequestError('Benutzer-ID ist erforderlich.');
    }

    const existiert = await Benutzer.findOne({ id });
    if (!existiert) {
      throw new errors.NotFoundError('Benutzer nicht gefunden.');
    }

    await Benutzer.destroyOne({ id });
  },

  /**
   * Zählt alle Benutzer in der Datenbank
   */
  count: async function () {
    return await Benutzer.count();
  }
};

/**
 * Hilfsfunktion zur Extraktion von Such- und Paginierungsparametern
 */
function extractUserFilters(req) {
  const search = req.query.search ? req.query.search.trim() : null;
  const page = req.query.page ? parseInt(req.query.page, 10) : null;
  const size = req.query.size ? parseInt(req.query.size, 10) : null;

  return { search, page, size };
}
