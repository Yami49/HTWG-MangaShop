const { v4: uuidv4 } = require('uuid');

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
  const vorhandeneKategorien = await Kategorie.count();
  if (vorhandeneKategorien === 0) {
    const kategorienDaten = [
      { name: 'Shonen', beschreibung: 'Actionreiche Manga für ein jüngeres männliches Publikum, mit Freundschaft, Kampf und Abenteuer.' },
      { name: 'Seinen', beschreibung: 'Erwachsenere Geschichten mit ernsten Themen, meist für ein älteres männliches Publikum.' },
      { name: 'Shojo', beschreibung: 'Romantische und gefühlvolle Geschichten, häufig mit weiblicher Hauptfigur und Fokus auf Beziehungen.' },
      { name: 'Slice of Life', beschreibung: 'Alltagsgeschichten über Schule, Arbeit oder Freundschaft – ruhig, emotional und realistisch.' },
      { name: 'Thriller', beschreibung: 'Spannende Manga mit Nervenkitzel, oft mit Krimi- oder Mystery-Elementen.' },
      { name: 'Action', beschreibung: 'Manga mit viel Bewegung, Kämpfen und spektakulären Szenen – Spannung pur.' }
    ];
    await Kategorie.createEach(kategorienDaten);
    sails.log.info('📚 Standard-Kategorien mit Beschreibungen wurden erstellt.');
  } else {
    sails.log.info('📚 Kategorien existieren bereits.');
  }

  // Produkte prüfen und erstellen
  const produktCount = await Produkt.count();
  if (produktCount === 0) {
    const kategorien = await Kategorie.find();
    if (kategorien.length === 0) {
      sails.log.error('❌ Keine Kategorien gefunden – Produkte können nicht erstellt werden.');
      return;
    }

    const produkte = [
      {
        titel: 'One Piece Vol. 1',
        beschreibung: 'Monkey D. Ruffy will König der Piraten werden. Der Auftakt zur legendären Reise!',
        preis: 6.99,
        kategorie: 'Shonen',
        quantity: 100,
        bild: '/images/onepiece1.jpg'
      },
      {
        titel: 'Attack on Titan Vol. 1',
        beschreibung: 'Menschen gegen Titanen – eine epische Schlacht um Freiheit beginnt.',
        preis: 7.99,
        kategorie: 'Seinen',
        quantity: 80,
        bild: '/images/aot1.jpg'
      },
      {
        titel: 'Naruto Vol. 1',
        beschreibung: 'Ein junger Ninja mit einem Traum: Hokage werden und anerkannt sein.',
        preis: 6.50,
        kategorie: 'Shonen',
        quantity: 90,
        bild: '/images/naruto1.jpg'
      },
      {
        titel: 'Death Note Vol. 1',
        beschreibung: 'Ein Schüler findet ein Notizbuch, das töten kann – das Spiel beginnt.',
        preis: 8.50,
        kategorie: 'Thriller',
        quantity: 70,
        bild: '/images/deathnote1.jpg'
      },
      {
        titel: 'Demon Slayer Vol. 1',
        beschreibung: 'Tanjiro kämpft gegen Dämonen, um seine Schwester zu retten.',
        preis: 7.50,
        kategorie: 'Action',
        quantity: 60,
        bild: '/images/demonslayer1.jpg'
      },
      {
        titel: 'My Hero Academia Vol. 1',
        beschreibung: 'In einer Welt voller Superkräfte kämpft Izuku für Gerechtigkeit.',
        preis: 6.75,
        kategorie: 'Shonen',
        quantity: 100,
        bild: '/images/mha1.jpg'
      },
      {
        titel: 'Tokyo Ghoul Vol. 1',
        beschreibung: 'Ein Student wird zum Halb-Ghoul und muss in einer dunklen Welt überleben.',
        preis: 8.25,
        kategorie: 'Seinen',
        quantity: 50,
        bild: '/images/tokyoghoul1.jpg'
      },
      {
        titel: 'Chainsaw Man Vol. 1',
        beschreibung: 'Ein Teufelsjäger mit einer Motorsäge als Herz kämpft ums Überleben.',
        preis: 7.80,
        kategorie: 'Action',
        quantity: 75,
        bild: '/images/chainsawman1.jpg'
      }
    ];

    for (const p of produkte) {
      const kategorieObjekt = kategorien.find(k => k.name === p.kategorie);
      if (!kategorieObjekt) {
        sails.log.warn(`⚠️ Kategorie ${p.kategorie} nicht gefunden – Produkt "${p.titel}" wird übersprungen.`);
        continue;
      }

      await Produkt.create({
        produktId: uuidv4(),
        titel: p.titel,
        beschreibung: p.beschreibung,
        preis: p.preis,
        kategorie: kategorieObjekt.id,
        quantity: p.quantity,
        bild: p.bild
      });
    }

    sails.log.info('📦 Feste Beispielprodukte wurden erstellt.');
  } else {
    sails.log.info('📦 Produkte existieren bereits.');
  }
};
