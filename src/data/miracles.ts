/*
 01_ARGENTINE   10_INDIA        19_SWITZERLAND
 02_AUSTRIA     11_ITALY        20_VENEZUELA
 03_BELGIUM     12_MARTINIQUE  '21_SAINTS, MYSTICS AND THE EUCHARIST'
 04_COLOMBIA    13_MEXICO      '22_OUR LADY AND THE EUCHARIST'
 05_CROATIA     14_PERU        '23_MIRACULOUS COMMUNIONS'
 06_EGYPT       15_POLAND      '24_MAPS OF COUNTRIES'
 07_FRANCE      16_PORTUGAL    '27_PRESENTATION OF EXHIBITION'
 08_GERMANY     17_REUNION
 09_HOLLAND     18_SPAIN
 */

const description = "Lorem Ipsum"

const page = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const miracles = [
  /*
  {
    "country": "Argentina",
    "city": "Buenos Aires",
    "year": "1992-1994-1996",
    "categories": [],
    "path": "argentina/buenos_aires_1.json"
  },
  {
    "country": "Argentina",
    "city": "Buenos Aires",
    "year": "1992-1994-1996",
    "categories": [],
    "path": "argentina/buenos_aires_2.json"
  },
  {
    "country": "ARGENTINA",
    "city": "BUENOS AIRES",
    "year": "1992-1994-1996",
    "categories": [],
    "path": "argentina/buenos_aires_3.json"
  },
  */
  {
    "country": "Austria",
    "city": "Fiecht",
    "year": "1310",
    "categories": [
      "blood",
      "doubt",
      "preservation"
    ],
    "path": "austria/fiecht.json"
  },
  {
    "country": "Austria",
    "city": "Seefeld",
    "year": "1384",
    "categories": [
      "blood"
    ],
    "path": "austria/seefeld.json"
  },
  {
    "country": "Austria",
    "city": "Weiten-Raxendorf",
    "year": "1411",
    "categories": [
      "animals",
      "blood",
      "light",
      "theft"
    ],
    "path": "austria/weiten-raxendorf.json"
  },
  {
    "country": "Belgium",
    "city": "Bois-Seigneur-Isaac",
    "year": "1405",
    "categories": [
      "blood"
    ],
    "path": "belgium/bois-seigneur-issac.json"
  },
  {
    "country": "Belgium",
    "city": "Brussels",
    "year": "1370",
    "categories": [
      "blood",
      "theft"
    ],
    "path": "belgium/brussels.json"
  },
  {
    "country": "Belgium",
    "city": "Herentals",
    "year": "1412",
    "categories": [
      "light",
      "theft"
    ],
    "path": "belgium/herentals.json"
  },
  {
    "country": "Belgium",
    "city": "Herkenrode-Hasselt",
    "year": "1317",
    "categories": [
      "blood",
      "face"
    ],
    "path": "belgium/herkenrode-hasselt.json"
  },
  {
    "country": "Belgium",
    "city": "Middleburg-Lovanio",
    "year": "1374",
    "categories": [
      "blood"
    ],
    "path": "belgium/middleburg-lovanio.json"
  },
  {
    "country": "Colombia",
    "city": "Tumaco",
    "year": "1906",
    "categories": [
      "flood"
    ],
    "path": "colombia/tumaco.json"
  },
  {
    "country": "Croatia",
    "city": "Ludbreg",
    "year": "1411",
    "categories": [
      "blood",
      "doubt"
    ],
    "path": "croatia/ludbreg.json"
  },
  {
    "country": "Egypt",
    "city": "Scete",
    "year": "Third - Fifth Centuries",
    "categories": [
      "blood",
      "face"
    ],
    "path": "egypt/scete.json"
  },
  {
    "country": "Egypt",
    "city": "St. Mary of Egypt",
    "year": "Seventh Century",
    "categories": [],
    "path": "egypt/st_mary_of_egypt.json"
  },
  {
    "country": "France",
    "city": "Avignon",
    "year": "1433",
    "categories": [
      "flood"
    ],
    "path": "france/avignon.json"
  },
  {
    "country": "France",
    "city": "Blanot",
    "year": "1331",
    "categories": [
      "blood",
      "preservation"
    ],
    "path": "france/blanot.json"
  },
  {
    "country": "France",
    "city": "Bordeaux",
    "year": "1822",
    "categories": [
      "face"
    ],
    "path": "france/bordeaux.json"
  },
  {
    "country": "France",
    "city": "Dijon",
    "year": "1430",
    "categories": [
      "blood",
      "face",
      "preservation"
    ],
    "path": "france/dijon.json"
  },
  {
    "country": "France",
    "city": "Douai",
    "year": "1254",
    "categories": [
      "face",
      "levitation"
    ],
    "path": "france/douai.json"
  },
  {
    "country": "France",
    "city": "Faverney",
    "year": "1608",
    "categories": [
      "fire",
      "levitation"
    ],
    "path": "france/faverney.json"
  },
  {
    "country": "France",
    "city": "La Rochelle",
    "year": "1461",
    "categories": [],
    "path": "france/la_rochelle.json"
  },
  {
    "country": "France",
    "city": "Les Ulmes",
    "year": "1668",
    "categories": [
      "face"
    ],
    "path": "france/les_ulmes.json"
  },
  {
    "country": "France",
    "city": "Marseille-Eu-Beauvais",
    "year": "1533",
    "categories": [
      "theft"
    ],
    "path": "france/marseille-eu-beauvais.json"
  },
  {
    "country": "France",
    "city": "Paris",
    "year": "1290",
    "categories": [
      "blood",
      "fire",
      "levitation"
    ],
    "path": "france/paris.json"
  },
  {
    "country": "France",
    "city": "Pressac",
    "year": "1643",
    "categories": [
      "fire"
    ],
    "path": "france/pressac.json"
  },
  {
    "country": "Germany",
    "city": "Augsburg",
    "year": "1194",
    "categories": [
      "blood",
      "face",
      "theft"
    ],
    "path": "germany/augsburg.json"
  },
  {
    "country": "Germany",
    "city": "Benningen",
    "year": "1216",
    "categories": [
      "blood",
      "theft"
    ],
    "path": "germany/benningen.json"
  },
  {
    "country": "Germany",
    "city": "Bettbrunn",
    "year": "1125",
    "categories": [
      "theft",
      "weight"
    ],
    "path": "germany/bettbrunn.json"
  },
  {
    "country": "Germany",
    "city": "Erding",
    "year": "1417",
    "categories": [
      "levitation",
      "light",
      "theft"
    ],
    "path": "germany/erding.json"
  },
  {
    "country": "Germany",
    "city": "Kranenburg, District of Kleve",
    "year": "1280",
    "categories": [],
    "path": "germany/kranenburg_district_of_kleve.json"
  },
  {
    "country": "Germany",
    "city": "Regensburg",
    "year": "1255",
    "categories": [
      "doubt"
    ],
    "path": "germany/regensburg.json"
  },
  {
    "country": "Germany",
    "city": "Walldurn",
    "year": "1330",
    "categories": [
      "face"
    ],
    "path": "germany/walldurn.json"
  },
  {
    "country": "Germany",
    "city": "Wilsnack",
    "year": "1383",
    "categories": [
      "blood",
      "fire"
    ],
    "path": "germany/wilsnack.json"
  },
  {
    "country": "Netherlands",
    "city": "Alkmaar",
    "year": "1429",
    "categories": [
      "blood"
    ],
    "path": "holland/alkmaar.json"
  },
  {
    "country": "Netherlands",
    "city": "Amsterdam",
    "year": "1345",
    "categories": [
      "fire",
      "light"
    ],
    "path": "holland/amsterdam.json"
  },
  {
    "country": "Netherlands",
    "city": "Bergen",
    "year": "1421",
    "categories": [
      "blood"
    ],
    "path": "holland/bergen.json"
  },
  {
    "country": "Netherlands",
    "city": "Boxmeer",
    "year": "1400",
    "categories": [
      "blood",
      "doubt"
    ],
    "path": "holland/boxmeer.json"
  },
  {
    "country": "Netherlands",
    "city": "Boxtel-Hoogstraten",
    "year": "1380",
    "categories": [
      "blood"
    ],
    "path": "holland/boxtel-hoogstraten.json"
  },
  {
    "country": "Netherlands",
    "city": "Breda-Niervaart",
    "year": "1300",
    "categories": [
      "preservation",
      "theft"
    ],
    "path": "holland/breda-neirvaart.json"
  },
  {
    "country": "Netherlands",
    "city": "Meerssen",
    "year": "1222-1465",
    "categories": [
      "blood",
      "fire"
    ],
    "path": "holland/meerssen.json"
  },
  {
    "country": "Netherlands",
    "city": "Stiphout",
    "year": "1342",
    "categories": [
      "fire"
    ],
    "path": "holland/stiphout.json"
  },
  {
    "country": "India",
    "city": "Archdiocese of Trivandrum",
    "year": "May 5, 2001",
    "categories": [
      "face"
    ],
    "path": "india/chirattakonam.json"
  },
  {
    "country": "Italy",
    "city": "Alatri",
    "year": "1228",
    "categories": [
      "sorcery",
      "theft"
    ],
    "path": "italy/alatri.json"
  },
  {
    "country": "Italy",
    "city": "Saint Clare of Assisi",
    "year": "1240",
    "categories": [],
    "path": "italy/assisi.json"
  },
  {
    "country": "Italy",
    "city": "Asti",
    "year": "1535",
    "categories": [
      "blood"
    ],
    "path": "italy/asti_1.json"
  },
  {
    "country": "Italy",
    "city": "Asti",
    "year": "1718",
    "categories": [
      "blood"
    ],
    "path": "italy/asti_2.json"
  },
  {
    "country": "Italy",
    "city": "Bagno di Romagna",
    "year": "1412",
    "categories": [
      "blood",
      "doubt"
    ],
    "path": "italy/bagno_di_romagna.json"
  },
  {
    "country": "Italy",
    "city": "Bolsena",
    "year": "1264",
    "categories": [
      "blood",
      "doubt"
    ],
    "path": "italy/bolsena.json"
  },
  {
    "country": "Italy",
    "city": "Canosio",
    "year": "1630",
    "categories": [
      "flood"
    ],
    "path": "italy/canosio.json"
  },
  {
    "country": "Italy",
    "city": "Cascia",
    "year": "1330",
    "categories": [
      "blood"
    ],
    "path": "italy/cascia.json"
  },
  {
    "country": "Italy",
    "city": "Cava dei Tirreni",
    "year": "1656",
    "categories": [],
    "path": "italy/cava_dei_tirreni.json"
  },
  {
    "country": "Italy",
    "city": "Dronero",
    "year": "1631",
    "categories": [
      "fire"
    ],
    "path": "italy/dronero.json"
  },
  {
    "country": "Italy",
    "city": "Ferrara",
    "year": "1171",
    "categories": [
      "blood",
      "face"
    ],
    "path": "italy/ferrara.json"
  },
  {
    "country": "Italy",
    "city": "Firenze",
    "year": "1230-1595",
    "categories": [
      "blood"
    ],
    "path": "italy/florence_1.json"
  },
  {
    "country": "Italy",
    "city": "Firenze",
    "year": "1230-1595",
    "categories": [
      "fire"
    ],
    "path": "italy/florence_2.json"
  },
  {
    "country": "Italy",
    "city": "Gruaro (Valvasone)",
    "year": "1294",
    "categories": [
      "blood"
    ],
    "path": "italy/gruary_valvasone.json"
  },
  {
    "country": "Italy",
    "city": "Lanciano",
    "year": "750 A.D",
    "categories": [
      "blood",
      "doubt",
      "science",
      "weight"
    ],
    "path": "italy/lanciano.json"
  },
  {
    "country": "Italy",
    "city": "Macerata",
    "year": "1356",
    "categories": [
      "blood",
      "doubt"
    ],
    "path": "italy/macerata.json"
  },
  {
    "country": "Italy",
    "city": "Mogoro",
    "year": "1604",
    "categories": [
      "weight"
    ],
    "path": "italy/mogoro.json"
  },
  {
    "country": "Italy",
    "city": "Morrovalle",
    "year": "1560",
    "categories": [
      "fire"
    ],
    "path": "italy/morrovalle.json"
  },
  {
    "country": "Italy",
    "city": "Offida",
    "year": "1273-1280",
    "categories": [
      "animals",
      "fire",
      "sorcery"
    ],
    "path": "italy/offida.json"
  },
  {
    "country": "Italy",
    "city": "Patierno (Naples)",
    "year": "1772",
    "categories": [
      "animals",
      "light",
      "preservation",
      "theft"
    ],
    "path": "italy/patierno_naples.json"
  },
  {
    "country": "Italy",
    "city": "Rimini",
    "year": "1227",
    "categories": [
      "animals",
      "doubt"
    ],
    "path": "italy/rimini.json"
  },
  {
    "country": "Italy",
    "city": "Rome",
    "year": "Sixth - Seventh Centuries",
    "categories": [
      "blood",
      "doubt"
    ],
    "path": "italy/rome_1.json"
  },
  {
    "country": "Italy",
    "city": "Rome",
    "year": "1610",
    "categories": [
      "blood",
      "doubt",
      "weight"
    ],
    "path": "italy/rome_3.json"
  },
  {
    "country": "Italy",
    "city": "Salzano",
    "year": "1517",
    "categories": [
      "animals"
    ],
    "path": "italy/salzano.json"
  },
  {
    "country": "Italy",
    "city": "San Mauro Lu Bruca",
    "year": "1969",
    "categories": [
      "preservation",
      "science",
      "theft"
    ],
    "path": "italy/san_mauro_la_bruca.json"
  },
  {
    "country": "Italy",
    "city": "Scala",
    "year": "1732",
    "categories": [],
    "path": "italy/scala.json"
  },
  {
    "country": "Italy",
    "city": "Siena",
    "year": "1730",
    "categories": [
      "preservation",
      "science",
      "theft"
    ],
    "path": "italy/siena.json"
  },
  {
    "country": "Italy",
    "city": "St. Peter Damian",
    "year": "Eleventh Century",
    "categories": [
      "flesh",
      "sorcery",
      "theft"
    ],
    "path": "italy/st_peter_damian.json"
  },
  {
    "country": "Italy",
    "city": "Trani",
    "year": "Eleventh Century",
    "categories": [
      "blood",
      "doubt",
      "theft"
    ],
    "path": "italy/trani.json"
  },
  {
    "country": "Italy",
    "city": "Turin",
    "year": "1453",
    "categories": [
      "animals",
      "levitation",
      "light",
      "theft"
    ],
    "path": "italy/turin_1.json"
  },
  {
    "country": "Italy",
    "city": "Turin",
    "year": "1640",
    "categories": [
      "fire"
    ],
    "path": "italy/turin_3.json"
  },
  {
    "country": "Italy",
    "city": "Veroli",
    "year": "1570",
    "categories": [
      "face"
    ],
    "path": "italy/veroli.json"
  },
  {
    "country": "Italy",
    "city": "Volterra",
    "year": "1472",
    "categories": [
      "levitation",
      "light",
      "theft"
    ],
    "path": "italy/volterra.json"
  },
  {
    "country": "Caribbean Island of Martinique",
    "city": "Morne-Rouge",
    "year": "1902",
    "categories": [
      "face"
    ],
    "path": "martinique/morne-rouge.json"
  },
  /*
  {
    "country": "Mexico",
    "city": "Tixtla",
    "year": "October 21, 2006",
    "categories": [
      "blood"
    ],
    "path": "mexico/tixtla_1.json"
  },
  {
    "country": "Mexico",
    "city": "Tixtla",
    "year": "October 21, 2006",
    "categories": [
      "blood",
      "flesh",
      "science"
    ],
    "path": "mexico/tixtla_2.json"
  },
  */
  {
    "country": "Peru",
    "city": "Eten",
    "year": "1649",
    "categories": [
      "face"
    ],
    "path": "peru/eten.json"
  },
  {
    "country": "Poland",
    "city": "Glotowo",
    "year": "1290",
    "categories": [
      "animals",
      "light"
    ],
    "path": "poland/glotowo.json"
  },
  {
    "country": "Poland",
    "city": "Krakow",
    "year": "1345",
    "categories": [
      "light",
      "theft"
    ],
    "path": "poland/krakow.json"
  },
  {
    "country": "Poland",
    "city": "Legnica",
    "year": "2013",
    "categories": [
      "science",
      "tissue"
    ],
    "path": "poland/legnica.json"
  },
  {
    "country": "Poland",
    "city": "Poznan",
    "year": "1399",
    "categories": [
      "blood",
      "levitation",
      "light"
    ],
    "path": "poland/poznan.json"
  },
  /*
  {
    "country": "Poland",
    "city": "Sokolka",
    "year": "October 12, 2008",
    "categories": [
      "science",
      "tissue"
    ],
    "path": "poland/sokółka_1.json"
  },
  {
    "country": "Poland",
    "city": "Sokółka",
    "year": "October 12, 2008",
    "categories": [
      "preservation",
      "science",
      "tissue"
    ],
    "path": "poland/sokółka_2.json"
  },
  {
    "country": "Poland",
    "city": "Sokółka",
    "year": "October 12, 2008",
    "categories": [
      "science",
      "tissue"
    ],
    "path": "poland/sokółka_3.json"
  },
  */
  {
    "country": "Portugal",
    "city": "Santarem",
    "year": "1247",
    "categories": [
      "blood",
      "face",
      "light",
      "sorcery",
      "theft"
    ],
    "path": "portugal/santarem.json"
  },
  {
    "country": "Reunion",
    "city": "Saint Andre",
    "year": "1902",
    "categories": [
      "face"
    ],
    "path": "reunion/saint_andre.json"
  },
  {
    "country": "Spain",
    "city": "Alboraya-Almácera",
    "year": "1348",
    "categories": [
      "animals"
    ],
    "path": "spain/alboraya.json"
  },
  {
    "country": "Spain",
    "city": "Alcalá",
    "year": "1597",
    "categories": [
      "preservation",
      "theft"
    ],
    "path": "spain/alcala.json"
  },
  {
    "country": "Spain",
    "city": "Alcoy",
    "year": "1568",
    "categories": [
      "theft"
    ],
    "path": "spain/alcoy.json"
  },
  {
    "country": "Spain",
    "city": "Caravaca de La Cruz",
    "year": "1231",
    "categories": [
      "face"
    ],
    "path": "spain/carvaca_de_la_cruz.json"
  },
  {
    "country": "Spain",
    "city": "Cimballa",
    "year": "1370",
    "categories": [
      "blood",
      "doubt",
      "flesh"
    ],
    "path": "spain/cimballa.json"
  },
  {
    "country": "Spain",
    "city": "Daroca",
    "year": "1239",
    "categories": [
      "animals",
      "blood"
    ],
    "path": "spain/daroca.json"
  },
  {
    "country": "Spain",
    "city": "Gerona",
    "year": "1297",
    "categories": [
      "blood",
      "doubt",
      "flesh"
    ],
    "path": "spain/gerona.json"
  },
  {
    "country": "Netherlands-Spain",
    "city": "Gorkum-Escorial",
    "year": "1572",
    "categories": [
      "blood"
    ],
    "path": "spain/gorkum-escorial.json"
  },
  {
    "country": "Spain",
    "city": "Guadalupe",
    "year": "1420",
    "categories": [
      "blood",
      "doubt"
    ],
    "path": "spain/guadalupe.json"
  },
  {
    "country": "Spain",
    "city": "Ivorra",
    "year": "1010",
    "categories": [
      "blood",
      "doubt"
    ],
    "path": "spain/ivorra.json"
  },
  {
    "country": "Spain",
    "city": "Moncada",
    "year": "1392",
    "categories": [
      "doubt",
      "face"
    ],
    "path": "spain/moncada.json"
  },
  {
    "country": "Spain",
    "city": "Montserrat",
    "year": "1657",
    "categories": [],
    "path": "spain/montserrat.json"
  },
  {
    "country": "Spain",
    "city": "O'Cebreiro",
    "year": "1300",
    "categories": [
      "blood",
      "doubt",
      "flesh"
    ],
    "path": "spain/ocebreiro.json"
  },
  {
    "country": "Spain",
    "city": "Onil",
    "year": "1824",
    "categories": [
      "preservation",
      "theft"
    ],
    "path": "spain/onil.json"
  },
  {
    "country": "Spain",
    "city": "Ponferrada",
    "year": "1533",
    "categories": [
      "animals",
      "light",
      "theft",
      "weight"
    ],
    "path": "spain/ponferrada.json"
  },
  {
    "country": "Spain",
    "city": "Saint John of the Abbesses",
    "year": "1251",
    "categories": [
      "preservation"
    ],
    "path": "spain/saint_john_of_the_abbesses.json"
  },
  {
    "country": "Spain",
    "city": "Silla",
    "year": "1907",
    "categories": [
      "theft"
    ],
    "path": "spain/silla.json"
  },
  {
    "country": "Spain",
    "city": "Zaragoza",
    "year": "1427",
    "categories": [
      "face",
      "fire",
      "sorcery",
      "theft"
    ],
    "path": "spain/zaragoza.json"
  },
  {
    "country": "Switzerland",
    "city": "Ettiswil",
    "year": "1447",
    "categories": [
      "animals",
      "levitation",
      "light",
      "theft",
      "weight"
    ],
    "path": "switzerland/ettiswil.json"
  },
  {
    "country": "Venezuela",
    "city": "Betania",
    "year": "December 8, 1991",
    "categories": [
      "blood",
      "science"
    ],
    "path": "venezuela/betania.json"
  }
]

export {
  miracles,
}