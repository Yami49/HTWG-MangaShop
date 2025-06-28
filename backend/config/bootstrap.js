const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
console.log('MONGO_URL:', process.env.MONGO_URL);


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
        nachname: 'Admin',
        istAdmin: true
      },
      {
        email: 'user@user.com',
        passwort: await sails.helpers.passwords.hashPassword('user'),
        vorname: 'Benutzer',
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
        bild: '../../src/assets/images/onepiece1.png'
      },
      {
        titel: 'Attack on Titan Vol. 1',
        beschreibung: 'Menschen gegen Titanen – eine epische Schlacht um Freiheit beginnt.',
        preis: 7.99,
        kategorie: 'Seinen',
        quantity: 80,
        bild: '../../src/assets/images/aot1.png'
      },
      {
        titel: 'Naruto Vol. 1',
        beschreibung: 'Ein junger Ninja mit einem Traum: Hokage werden und anerkannt sein.',
        preis: 6.50,
        kategorie: 'Shonen',
        quantity: 90,
        bild: '../../src/assets/images/naruto1.png'
      },
      {
        titel: 'Death Note Vol. 1',
        beschreibung: 'Ein Schüler findet ein Notizbuch, das töten kann – das Spiel beginnt.',
        preis: 8.50,
        kategorie: 'Thriller',
        quantity: 70,
        bild: '../../src/assets/images/deathnote1.png'
      },
      {
        titel: 'Demon Slayer Vol. 1',
        beschreibung: 'Tanjiro kämpft gegen Dämonen, um seine Schwester zu retten.',
        preis: 7.50,
        kategorie: 'Action',
        quantity: 60,
        bild: '../../src/assets/images/demonslayer1.png'
      },
      {
        titel: 'My Hero Academia Vol. 1',
        beschreibung: 'In einer Welt voller Superkräfte kämpft Izuku für Gerechtigkeit.',
        preis: 6.75,
        kategorie: 'Shonen',
        quantity: 100,
        bild: '../../src/assets/images/mha1.png'
      },
      {
        titel: 'Tokyo Ghoul Vol. 1',
        beschreibung: 'Ein Student wird zum Halb-Ghoul und muss in einer dunklen Welt überleben.',
        preis: 8.25,
        kategorie: 'Seinen',
        quantity: 50,
        bild: '../../src/assets/images/tokyoghoul1.png'
      },
      {
        titel: 'Chainsaw Man Vol. 1',
        beschreibung: 'Ein Teufelsjäger mit einer Motorsäge als Herz kämpft ums Überleben.',
        preis: 7.80,
        kategorie: 'Action',
        quantity: 75,
        bild: '../../src/assets/images/chainsawman1.png'
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

    // Blogbeiträge prüfen und erstellen
  const blogCount = await Blog.count();
  if (blogCount === 0) {
    await Blog.createEach([
      {
        titel: '📚 One Piece jetzt im Sortiment!',
        inhalt: 'Endlich bei uns erhältlich: Die Abenteuer von Ruffy, dem angehenden Piratenkönig. Jetzt stöbern!',
        aktiv: true,
        erstelltAm: new Date('2024-06-01T10:00:00Z')
      },
      {
        titel: '✨ Demon Slayer – Bestseller des Monats!',
        inhalt: 'Tanjiros Kampf gegen Dämonen begeistert die Manga-Community. Jetzt Band 1 bis 5 erhältlich.',
        aktiv: true,
        erstelltAm: new Date('2024-06-05T12:30:00Z')
      },
      {
        titel: '📰 Neue Kategorien im Shop verfügbar',
        inhalt: 'Du findest ab sofort auch Thriller und Slice of Life! Entdecke neue Lieblingsgenres.',
        aktiv: true,
        erstelltAm: new Date('2024-06-10T08:15:00Z')
      }
    ]);
    sails.log.info('📝 Drei öffentliche Blogbeiträge wurden erstellt.');
  } else {
    sails.log.info('📝 Blogeinträge existieren bereits.');
  }

};
