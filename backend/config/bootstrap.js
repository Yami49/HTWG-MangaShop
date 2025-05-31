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
  const kategorien = ['Shonen', 'Seinen', 'Shojo', 'Slice of Life', 'Thriller', 'Action'];
  const vorhandeneKategorien = await Kategorie.count();
  if (vorhandeneKategorien === 0) {
    await Kategorie.createEach(kategorien.map(name => ({ name })));
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
    await Produkt.createEach(
      mangaNamen.map(titel => ({
        titel,
        description: `${titel} ist ein beliebter Manga-Titel.`,
        price: (Math.random() * 20 + 5).toFixed(2),
        quantity: 50
      }))
    );
    sails.log.info('📦 Standard-Produkte wurden erstellt.');
  } else {
    sails.log.info('📦 Produkte existieren bereits.');
  }
};
