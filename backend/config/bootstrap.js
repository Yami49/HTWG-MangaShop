module.exports.bootstrap = async function () {
  sails.log.info('🔧 MangaShop: Bootstrap läuft...');

  // Benutzer prüfen und erstellen
  const benutzerCount = await Benutzer.count();
  if (benutzerCount === 0) {
    await Benutzer.createEach([
      {
        email: 'admin@admin.com',
        passwort: await sails.helpers.passwords.hashPassword('admin'),
        vorname: 'Admin',
        nachname: 'User',
        istAdmin: true
      },
      {
        email: 'user@user.com',
        passwort: await sails.helpers.passwords.hashPassword('user'),
        vorname: 'Standard',
        nachname: 'Benutzer',
        istAdmin: false
      }
    ]);
    sails.log.info('👤 Standard-Benutzer wurden erstellt.');
  } else {
    sails.log.info('👤 Benutzer existieren bereits.');
  }

  // Kategorien prüfen und erstellen
  const kategorienNamen = ['Shonen', 'Seinen', 'Shojo', 'Slice of Life', 'Thriller', 'Action'];
  const vorhandeneKategorien = await Kategorie.count();
  if (vorhandeneKategorien === 0) {
    await Kategorie.createEach(kategorienNamen.map(name => ({ name })));
    sails.log.info('📚 Standard-Kategorien wurden erstellt.');
  } else {
    sails.log.info('📚 Kategorien existieren bereits.');
  }

  // Produkte prüfen und erstellen
  const mangaNamen = [
    'One Piece',
    'Naruto',
    'Bleach',
    'Dragon Ball',
    'Vinland Saga',
    'Code Geass'
  ];

  const produktCount = await Produkt.count();
  if (produktCount === 0) {
    const kategorien = await Kategorie.find(); // echte Kategorien laden
    if (kategorien.length === 0) {
      sails.log.error('❌ Keine Kategorien gefunden – Produkte können nicht erstellt werden.');
      return;
    }

    for (const titel of mangaNamen) {
      const zufallsKategorie = kategorien[Math.floor(Math.random() * kategorien.length)];
      await Produkt.create({
        titel,
        beschreibung: `${titel} ist ein beliebter Manga-Titel.`,
        preis: parseFloat((Math.random() * 20 + 5).toFixed(2)),
        kategorie: zufallsKategorie.id,
        quantity: 50
      });
    }

    sails.log.info('📦 Standard-Produkte wurden erstellt.');
  } else {
    sails.log.info('📦 Produkte existieren bereits.');
  }
};
