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

const miracles = [
  {
    country: 'Argentina',
    city: 'Buenos Aires',
    year: '1992-1994-1996',
  },
  {
    country: 'Austria',
    city: 'Fiecht', 
    year: '1310',
  },
  {
    country: 'Austria',
    city: 'Seefeld', 
    year: '1384',
  },
  {
    country: 'Austria',
    city: 'Weiten-Raxendorf', 
    year: '1411',
  },
  {
    country: 'Belgium',
    city: 'Bois-Seigneur-Issac',
    year: '1405',
  },
  {
    country: 'Belgium',
    city: 'Bruges',
    year: '1203',
  },
  {
    country: 'Belgium',
    city: 'Brussels',
    year: '1370',
  },
  {
    country: 'Belgium',
    city: 'Herentals',
    year: '1412',
  },
  {
    country: 'Belgium',
    city: 'Herkenrode-Hasselt',
    year: '1317',
  },
  {
    country: 'Belgium',
    city: 'Liege',
    year: '1374',
  },
  {
    country: 'Belgium',
    city: 'Middleburg-Lovanio',
    year: '1374',
  },
  {
    country: 'Colombia',
    city: 'Tumaco',
    year: '1906',
  },
  {
    country: 'Croatia',
    city: 'Ludbreg',
    year: '1411',
  },
  {
    country: 'Egypt',
    city: 'St. Mary of Egypt',
    year: 'IV-V cent.'
  },
  {
    country: 'Egypt',
    city: 'Scete',
    year: 'III-V cent.'
  },
  {
    country: 'France',
    city: 'Avignon',
    year: '1433',
  },
  {
    country: 'France',
    city: 'Blanot',
    year: '1331',
  },
  {
    country: 'France',
    city: 'Bordeaux',
    year: '1822',
  },
  {
    country: 'France',
    city: 'Dijon',
    year: '1430',
  },
  {
    country: 'France',
    city: 'Douai',
    year: '1254',
  },
  {
    country: 'France',
    city: 'Faverney',
    year: '1608',
  },
  {
    country: 'France',
    city: 'La Rochelle',
    year: '1461',
  },
  {
    country: 'France',
    city: 'Neuvy Saint Sepulcre',
    year: '1257',
  },
  {
    country: 'France',
    city: 'Les Ulmes',
    year: '1688',
  },
  {
    country: 'France',
    city: 'Marseille-En-Beauvais',
    year: '1533',
  },
  {
    country: 'France',
    city: 'Paris',
    year: '1290',
  },
  {
    country: 'France',
    city: 'Pressac',
    year: '1643',
  },
  {
    country: 'Germany',
    city: 'Augsburg',
    year: '1194',
  },
  {
    country: 'Germany',
    city: 'Benningen',
    year: '1216',
  },
  {
    country: 'Germany',
    city: 'Bettbrunn',
    year: '1125',
  },
  {
    country: 'Germany',
    city: 'Erding',
    year: '1417',
  },
  {
    country: 'Germany',
    city: 'Kranenburg',
    year: '1280',
  },
  {
    country: 'Germany',
    city: 'Regensburg',
    year: '1255',
  },
  {
    country: 'Germany',
    city: 'Walldurn',
    year: '1330',
  },
  {
    country: 'Germany',
    city: 'Weingarten',
    year: '--',
  },
  {
    country: 'Germany',
    city: 'Wilsnack',
    year: '1383',
  },
  {
    country: 'Holland',
    city: 'Alkmaar',
    year: '1429',
  },
  {
    country: 'Holland',
    city: 'Amsterdam',
    year: '1345',
  },
  {
    country: 'Holland',
    city: 'Bergen',
    year: '1421',
  },
  {
    country: 'Holland',
    city: 'Boxmeer',
    year: '1400',
  },
  {
    country: 'Holland',
    city: 'Boxtel-Hoogstraten',
    year: '1380',
  },
  {
    country: 'Holland',
    city: 'Breda-Niervaart',
    year: '1300',
  },
  {
    country: 'Holland',
    city: 'Meerssen',
    year: '1222-1465',
  },
  {
    country: 'Holland',
    city: 'Stiphout',
    year: '1342',
  },
  {
    country: 'India',
    city: 'Chirattakonam',
    year: '2001',
  },
  {
    country: 'Italy',
    city: 'Alatri',
    year: '1228',
  },
  {
    country: 'Italy',
    city: 'Saint Clare of Assisi',
    year: '1240',
  },
  {
    country: 'Italy',
    city: 'Bagno di Romagna',
    year: '1412',
  },
  {
    country: 'Italy',
    city: 'Bolsena',
    year: '1264',
  },
  {
    country: 'Italy',
    city: 'Canosio',
    year: '1630',
  },
  {
    country: 'Italy',
    city: 'Cascia',
    year: '1330',
  },
  {
    country: 'Italy',
    city: 'Cava dei Tirreni',
    year: '1656',
  },
  {
    country: 'Italy',
    city: 'Dronero',
    year: '1631',
  },
  {
    country: 'Italy',
    city: 'San Mauro La Bruca',
    year: '1969',
  },
  {
    country: 'Italy',
    city: 'Ferrara',
    year: '1171',
  },
  {
    country: 'Italy',
    city: 'Florence',
    year: '1230-1595',
  },
  {
    country: 'Italy',
    city: 'Gruaro (Valvasone)',
    year: '1294',
  },
  {
    country: 'Italy',
    city: 'Lanciano',
    year: '750 D.C.',
  },
  {
    country: 'Italy',
    city: 'Macerata',
    year: '1356',
  },
  {
    country: 'Italy',
    city: 'Mogoro',
    year: '1604',
  },
  {
    country: 'Italy',
    city: 'Morrovalle',
    year: '1560',
  },
  {
    country: 'Italy',
    city: 'Offida',
    year: '1273-1280',
  },
  {
    country: 'Italy',
    city: 'Paiterno (Naples)',
    year: '1772',
  },
  {
    country: 'Italy',
    city: 'Rimini',
    year: '1227',
  },
  {
    country: 'Italy',
    city: 'Rome',
    year: 'VI-VII cent.',
  },
  {
    country: 'Italy',
    city: 'Rome',
    year: '1610',
  },
  {
    country: 'Italy',
    city: 'Rosano',
    year: '1948',
  },
  {
    country: 'Italy',
    city: 'S. Peter Damian',
    year: 'XI cent.',
  },
  {
    country: 'Italy',
    city: 'Salzano',
    year: '1517',
  },
  {
    country: 'Italy',
    city: 'Scala',
    year: '1732',
  },
  {
    country: 'Italy',
    city: 'Siena',
    year: '1730',
  },
  {
    country: 'Italy',
    city: 'Trani',
    year: 'XI sec.',
  },
  {
    country: 'Italy',
    city: 'Turin',
    year: '1453',
  },
  {
    country: 'Italy',
    city: 'Turin',
    year: '1640',
  },
  {
    country: 'Italy',
    city: 'Veroli',
    year: '1570',
  },
  {
    country: 'Italy',
    city: 'Volterra',
    year: '1472',
  },
  {
    country: 'Martinique',
    city: 'Morne-Rouge',
    year: '1902',
  },
  {
    country: 'Mexico',
    city: 'Tixtla',
    year: '2006',
  },
  {
    country: 'Peru',
    city: 'Eten',
    year: '1649',
  },
  {
    country: 'Poland',
    city: 'Krakow',
    year: '1345',
  },
  {
    country: 'Poland',
    city: 'Glotowo',
    year: '1290',
  },
  {
    country: 'Poland',
    city: 'Legnica',
    year: '2013',
  },
  {
    country: 'Poland',
    city: 'Poznan',
    year: '1399',
  },
  {
    country: 'Poland',
    city: 'Sokolka',
    year: '2008',
  },
  {
    country: 'Portugal',
    city: 'Santarem',
    year: '1247',
  },
  {
    country: 'Reunion Islands',
    city: 'Saint-Andre de la Reunion',
    year: '1902',
  },
  {
    country: 'Spain',
    city: 'Alboraya-Almacera',
    year: '1348',
  },
  {
    country: 'Spain',
    city: 'Alcala',
    year: '1597',
  },
  {
    country: 'Spain',
    city: 'Alcoy',
    year: '1568',
  },
  {
    country: 'Spain',
    city: 'Caravaca de la Cruz',
    year: '1231',
  },
  {
    country: 'Spain',
    city: 'Cimballa',
    year: '1370',
  },
  {
    country: 'Spain',
    city: 'Daroca',
    year: '1239',
  },
  {
    country: 'Spain',
    city: 'Gerona',
    year: '1297',
  },
  {
    country: 'Spain',
    city: 'Gorkum-El Escorial',
    year: '1572',
  },
  {
    country: 'Spain',
    city: 'Guadalupe',
    year: '1420',
  },
  {
    country: 'Spain',
    city: 'Ivorra',
    year: '1010',
  },
  {
    country: 'Spain',
    city: 'Moncada',
    year: '1392',
  },
  {
    country: 'Spain',
    city: 'Montserrat',
    year: '1652',
  },
  {
    country: 'Spain',
    city: "O'Cebreiro",
    year: '1300',
  },
  {
    country: 'Spain',
    city: 'Onil',
    year: '1828',
  },
  {
    country: 'Spain',
    city: 'Ponferrada',
    year: '1533',
  },
  {
    country: 'Spain',
    city: 'S. John of the Abbesses',
    year: '1251',
  },
  {
    country: 'Spain',
    city: 'Sila',
    year: '1907',
  },
  {
    country: 'Spain',
    city: 'Valencia',
    year: '--',
  },
  {
    country: 'Spain',
    city: 'Zaragoza',
    year: '1427',
  },
  {
    country: 'Switzerland',
    city: 'Ettiswil',
    year: '1447',
  },
  {
    country: 'Venezuela',
    city: 'Betania',
    year: '1991',
  },
]

export {
  miracles,
}