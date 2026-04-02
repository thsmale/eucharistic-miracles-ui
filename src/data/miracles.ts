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
    country: 'Argentina',
    city: 'Buenos Aires',
    year: '1992-1994-1996',
  },
  */
  {
    country: 'Austria',
    city: 'Fiecht', 
    year: '1310',
    path: 'austria/fiecht.json',
  },
  {
    country: 'Austria',
    city: 'Seefeld', 
    year: '1384',
    path: 'austria/seefeld.json',
  },
  {
    country: 'Austria',
    city: 'Weiten-Raxendorf', 
    year: '1411',
    path: 'austria/weiten-raxendorf.json',
  },
  {
    country: 'Belgium',
    city: 'Bois-Seigneur-Issac',
    year: '1405',
    path: 'belgium/bois-seigneur-issac.json',
  },
  {
    country: 'Belgium',
    city: 'Brussels',
    year: '1370',
    path: 'belgium/brussels.json',
  },
  {
    country: 'Belgium',
    city: 'Herentals',
    year: '1412',
    path: 'belgium/herentals.json',
  },
  {
    country: 'Belgium',
    city: 'Herkenrode-Hasselt',
    year: '1317',
    path: 'belgium/herkenrode-hasselt.json',
  },
  {
    country: 'Belgium',
    city: 'Middleburg-Lovanio',
    year: '1374',
    path: 'belgium/middleburg-lovanio.json',
  },
  {
    country: 'Colombia',
    city: 'Tumaco',
    year: '1906',
    path: 'colombia/tumaco.json',
  },
  {
    country: 'Croatia',
    city: 'Ludbreg',
    year: '1411',
    path: 'croatia/ludbreg.json',
  },
  {
    country: 'Egypt',
    city: 'St. Mary of Egypt',
    year: 'Seventh century',
    path: 'egypt/st_mary_of_egypt.json',
  },
  {
    country: 'Egypt',
    city: 'Scete',
    year: 'Third - fifth centuries',
    path: 'egypt/scete.json',
  },
  {
    country: 'France',
    city: 'Avignon',
    year: '1433',
    path: 'france/avignon.json',
  },
  {
    country: 'France',
    city: 'Blanot',
    year: '1331',
    path: 'france/blanot.json',
  },
  {
    country: 'France',
    city: 'Bordeaux',
    year: '1822',
    path: 'france/bordeaux.json',
  },
  {
    country: 'France',
    city: 'Dijon',
    year: '1430',
    path: 'france/dijon.json',
  },
  {
    country: 'France',
    city: 'Douai',
    year: '1254',
    path: 'france/douai.json',
  },
  {
    country: 'France',
    city: 'Faverney',
    year: '1608',
    path: 'france/faverney.json',
  },
  {
    country: 'France',
    city: 'La Rochelle',
    year: '1461',
    path: 'france/la_rochelle.json',
  },
  {
    country: 'France',
    city: 'Les Ulmes',
    year: '1688',
    path: 'france/les_ulmes.json',
  },
  {
    country: 'France',
    city: 'Marseille-En-Beauvais',
    year: '1533',
    path: 'france/marseille-eu-beauvais.json',
  },
  {
    country: 'France',
    city: 'Paris',
    year: '1290',
    path: 'france/paris.json',
  },
  {
    country: 'France',
    city: 'Pressac',
    year: '1643',
    path: 'france/pressac.json',
  },
  {
    country: 'Germany',
    city: 'Augsburg',
    year: '1194',
    path: 'germany/augsburg.json',
  },
  {
    country: 'Germany',
    city: 'Benningen',
    year: '1216',
    path: 'germany/benningen.json',
  },
  {
    country: 'Germany',
    city: 'Bettbrunn',
    year: '1125',
    path: 'germany/bettbrunn.json',
  },
  {
    country: 'Germany',
    city: 'Erding',
    year: '1417',
    path: 'germany/erding.json',
  },
  {
    country: 'Germany',
    city: 'Kranenburg',
    year: '1280',
    path: 'germany/kranenburg_district_of_kleve.json',
  },
  {
    country: 'Germany',
    city: 'Regensburg',
    year: '1255',
    path: 'germany/regensburg.json',
  },
  {
    country: 'Germany',
    city: 'Walldurn',
    year: '1330',
    path: 'germany/walldurn.json',
  },
  {
    country: 'Germany',
    city: 'Wilsnack',
    year: '1383',
    path: 'germany/wilsnack.json',
  },
  {
    country: 'Holland',
    city: 'Alkmaar',
    year: '1429',
    path: 'holland/alkmaar.json',
  },
  {
    country: 'Holland',
    city: 'Amsterdam',
    year: '1345',
    path: 'holland/amsterdam.json',
  },
  {
    country: 'Holland',
    city: 'Bergen',
    year: '1421',
    path: 'holland/bergen.json',
  },
  {
    country: 'Holland',
    city: 'Boxmeer',
    year: '1400',
    path: 'holland/boxmeer.json',
  },
  {
    country: 'Holland',
    city: 'Boxtel-Hoogstraten',
    year: '1380',
    path: 'holland/boxtel-hoogstraten.json',
  },
  {
    country: 'Holland',
    city: 'Breda-Niervaart',
    year: '1300',
    path: 'holland/breda-neirvaart.json',
  },
  {
    country: 'Holland',
    city: 'Meerssen',
    year: '1222-1465',
    path: 'holland/meerssen.json',
  },
  {
    country: 'Holland',
    city: 'Stiphout',
    year: '1342',
    path: 'holland/stiphout.json',
  },
  {
    country: 'India',
    city: 'Chirattakonam',
    year: '2001',
    path: 'india/chirattakonam.json',
  },
  {
    country: 'Italy',
    city: 'Alatri',
    year: '1228',
    path: 'italy/alatri.json',
  },
  {
    country: 'Italy',
    city: 'Saint Clare of Assisi',
    year: '1240',
    path: 'italy/assisi.json',
  },
  {
    country: 'Italy',
    city: 'Asti',
    year: '1535',
    path: 'italy/asti_1.json',
  },
  {
    country: 'Italy',
    city: 'Asti',
    year: '1718',
    path: 'italy/asti_2.json',
  },
  {
    country: 'Italy',
    city: 'Bagno di Romagna',
    year: '1412',
    path: 'italy/bagno_di_romagna.json',
  },
  {
    country: 'Italy',
    city: 'Bolsena',
    year: '1264',
    path: 'italy/bolsena.json',
  },
  {
    country: 'Italy',
    city: 'Canosio',
    year: '1630',
    path: 'italy/canosio.json',
  },
  {
    country: 'Italy',
    city: 'Cascia',
    year: '1330',
    path: 'italy/cascia.json',
  },
  {
    country: 'Italy',
    city: 'Cava dei Tirreni',
    year: '1656',
    path: 'italy/cava_dei_tirreni.json',
  },
  {
    country: 'Italy',
    city: 'Dronero',
    year: '1631',
    path: 'italy/dronero.json',
  },

  {
    country: 'Italy',
    city: 'Ferrara',
    year: '1171',
    path: 'italy/ferrara.json',
  },
  {
    country: 'Italy',
    city: 'Florence',
    year: '1230',
    path: 'italy/florence_1.json',
  },
  {
    country: 'Italy',
    city: 'Florence',
    year: '1595',
    path: 'italy/florence_2.json',
  },
  {
    country: 'Italy',
    city: 'Gruaro (Valvasone)',
    year: '1294',
    path: 'italy/gruary_valvasone.json',
  },
  {
    country: 'Italy',
    city: 'Lanciano',
    year: '750 A.D',
    path: 'italy/lanciano.json',
  },
  {
    country: 'Italy',
    city: 'Macerata',
    year: '1356',
    path: 'italy/macerata.json',
  },
  {
    country: 'Italy',
    city: 'Mogoro',
    year: '1604',
    path: 'italy/mogoro.json',
  },
  {
    country: 'Italy',
    city: 'Morrovalle',
    year: '1560',
    path: 'italy/morrovalle.json',
  },
  {
    country: 'Italy',
    city: 'Offida',
    year: '1273-1280',
    path: 'italy/offida.json',
  },
  {
    country: 'Italy',
    city: 'Paiterno (Naples)',
    year: '1772',
    path: 'italy/patierno_naples.json',
  },
  {
    country: 'Italy',
    city: 'Rimini',
    year: '1227',
    path: 'italy/rimini.json',
  },
  {
    country: 'Italy',
    city: 'Rome',
    year: 'Sixth - seventh centuries',
    path: 'italy/rome_1.json',
  },
  {
    country: 'Italy',
    city: 'Rome',
    year: '1610',
    path: 'italy/rome_3.json',
  },
  {
    country: 'Italy',
    city: 'Salzano',
    year: '1517',
    path: 'italy/salzano.json',
  },
  {
    country: 'Italy',
    city: 'San Mauro La Bruca',
    year: '1969',
    path: 'italy/san_mauro_la_bruca.json',
  },
  {
    country: 'Italy',
    city: 'Scala',
    year: '1732',
    path: 'italy/scala.json',
  },
  {
    country: 'Italy',
    city: 'Siena',
    year: '1730',
    path: 'italy/siena.json',
  },
  {
    country: 'Italy',
    city: 'St. Peter Damian',
    year: 'Eleventh century',
    path: 'italy/st_peter_damian.json',
  },
  {
    country: 'Italy',
    city: 'Trani',
    year: 'Eleventh century',
    path: 'italy/trani.json',
  },
  {
    country: 'Italy',
    city: 'Turin',
    year: '1453',
    path: 'italy/turin_1.json',
  },
  {
    country: 'Italy',
    city: 'Turin',
    year: '1640',
    path: 'italy/turin_3.json',
  },
  {
    country: 'Italy',
    city: 'Veroli',
    year: '1570',
    path: 'italy/veroli.json',
  },
  {
    country: 'Italy',
    city: 'Volterra',
    year: '1472',
    path: 'italy/volterra.json',
  },
  {
    country: 'Martinique',
    city: 'Morne-Rouge',
    year: '1902',
    path: 'martinique/morne-rouge.json',
  },
  /*
  {
    country: 'Mexico',
    city: 'Tixtla',
    year: '2006',
    path: '',
  },
  */
  {
    country: 'Peru',
    city: 'Eten',
    year: '1649',
    path: 'peru/eten.json',
  },
  {
    country: 'Poland',
    city: 'Glotowo',
    year: '1290',
    path: 'poland/glotowo.json',
  },
  {
    country: 'Poland',
    city: 'Krakow',
    year: '1345',
    path: 'poland/krakow.json',
  },
  {
    country: 'Poland',
    city: 'Legnica',
    year: '2013',
    path: 'poland/legnica.json',
  },
  {
    country: 'Poland',
    city: 'Poznan',
    year: '1399',
    path: 'poland/poznan.json',
  },
  /*
  {
    country: 'Poland',
    city: 'Sokolka',
    year: '2008',
  },
  */
  {
    country: 'Portugal',
    city: 'Santarem',
    year: '1247',
    path: 'portugal/santarem.json',
  },
  {
    country: 'Reunion',
    city: 'Saint Andre',
    year: '1902',
    path: 'reunion/saint_andre.json',
  },
  {
    country: 'Spain',
    city: 'Alboraya-Almacera',
    year: '1348',
    path: 'spain/alboraya.json',
  },
  {
    country: 'Spain',
    city: 'Alcala',
    year: '1597',
    path: 'spain/alcala.json',
  },
  {
    country: 'Spain',
    city: 'Alcoy',
    year: '1568',
    path: 'spain/alcoy.json',
  },
  {
    country: 'Spain',
    city: 'Caravaca de la Cruz',
    year: '1231',
    path: 'spain/carvaca_de_la_cruz.json',
  },
  {
    country: 'Spain',
    city: 'Cimballa',
    year: '1370',
    path: 'spain/cimballa.json',
  },
  {
    country: 'Spain',
    city: 'Daroca',
    year: '1239',
    path: 'spain/daroca.json',
  },
  {
    country: 'Spain',
    city: 'Gerona',
    year: '1297',
    path: 'spain/gerona.json',
  },
  {
    country: 'Spain',
    city: 'Gorkum-Escorial',
    year: '1572',
    path: 'spain/gorkum-escorial.json',
  },
  {
    country: 'Spain',
    city: 'Guadalupe',
    year: '1420',
    path: 'spain/guadalupe.json',
  },
  {
    country: 'Spain',
    city: 'Ivorra',
    year: '1010',
    path: 'spain/ivorra.json',
  },
  {
    country: 'Spain',
    city: 'Moncada',
    year: '1392',
    path: 'spain/moncada.json',
  },
  {
    country: 'Spain',
    city: 'Montserrat',
    year: '1652',
    path: 'spain/montserrat.json',
  },
  {
    country: 'Spain',
    city: "O'Cebreiro",
    year: '1300',
    path: 'spain/ocebreiro.json',
  },
  {
    country: 'Spain',
    city: 'Onil',
    year: '1828',
    path: 'spain/onil.json',
  },
  {
    country: 'Spain',
    city: 'Ponferrada',
    year: '1533',
    path: 'spain/ponferrada.json',
  },
  {
    country: 'Spain',
    city: 'Saint John of the Abbesses',
    year: '1251',
    path: 'spain/saint_john_of_the_abbesses.json',
  },
  {
    country: 'Spain',
    city: 'Sila',
    year: '1907',
    path: 'spain/silla.json',
  },
  {
    country: 'Spain',
    city: 'Zaragoza',
    year: '1427',
    path: 'spain/zaragoza.json',
  },
  {
    country: 'Switzerland',
    city: 'Ettiswil',
    year: '1447',
    path: 'switzerland/ettiswil.json',
  },
  {
    country: 'Venezuela',
    city: 'Betania',
    year: '1991',
    path: 'venezuela/betania.json',
  },
]

export {
  miracles,
}