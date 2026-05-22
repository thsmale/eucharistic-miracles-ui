import Fuse from 'fuse.js';

const colorMap: Record<string, string> = {
  "blood": "#FFB3B3",        // Fresh Rose: More vivid than light-critical, less harsh than red
  "theft": "#AAB8C2",        // Cool Slate: A punchier blue-grey, similar to a saturated light-6
  "doubt": "#E0E0E0",        // Bright Silver: A crisp, confident grey with more depth than light-2
  "face": "#FFECB3",         // Soft Gold: Similar to accent-3, but creamier and more "lit"
  "light": "#FFF59D",        // Sunny: A high-visibility but soft yellow, avoids the "beige" trap
  "fire": "#FFCC80",         // Bright Peach: Similar to status-warning, but lighter and friendlier
  "preservation": "#C5E1A5", // Spring Leaf: A vibrant, clear green-grey similar to status-ok
  "animals": "#D7CCC8",      // Warm Clay: A cleaner tan that feels modern rather than muddy
  "science": "#B2FFD2",      // Electric Mint: A clean, high-energy pastel green
  "levitation": "#B3E5FC",   // Sky Spark: A saturated light blue that pops against white
  "weight": "#BDBDBD",       // Concrete: A solid, medium-light grey with neutral clarity
  "sorcery": "#E1BEE7",      // Bright Orchid: Similar to accent-4, but much more luminous
  "flesh": "#FFCCBC",        // Warm Apricot: High-clarity peach that feels vibrant on-screen
  "tissue": "#FFEBEE",       // Cherry Blossom: A high-light pink with a clear, sharp base
  "flood": "#90CAF9"         // Azure Mist: A clear, energetic blue that mimics neutral-3
};

/**
 * Used for a tags in json data or for resources
 * Provides the ability to look up a path and get this metadata
 * So that we can set the proper URL
 * @param endpoint
 */
const getMiracle = (endpoint) => {
  const miracle = miracles.find(miracle => miracle.endpoint === endpoint);
  return miracle || {};
}

/**
 * Returning null here as an indicator that getPath failed
 * versus location.state.path would be undefined 
 * so you can trace to see how the app failed in a 404
 * pretty hacky... should handle this better
 */
const getPath = (endpoint) => {
  const miracle = miracles.find(miracle => miracle.endpoint === endpoint);
  return miracle?.path || null;
}

const handleCategoryFilters = (miracles, categories) => {
  if (categories.length === 0) return miracles;
  return miracles.filter(miracle => {
    if (categories.some(category => miracle.categories.includes(category))) {
      return true;
    }
    return false;
  })
}

const handleCountryFilters = (miracles, countries) => {
  if (countries.length === 0) return miracles;
  return miracles.filter((miracle) => (
    // Split only applies to one miracle, Netherlands-Spain
    miracle.country.split('-').some(country => countries.includes(country))
  ))
}

const handleSearchFilters = (miracles, searchInput) => {
  if (searchInput === '') return miracles;
  const fuse = new Fuse(miracles, {
    ignoreDiacritics: true,
    keys: ['country', 'city', 'year', 'categories'],
    threshold: 0.2,
  });
  const results = fuse.search(searchInput);
  return results.map(result => result.item);
}

const handleSort = (miracles, sort) => {
  const property = sort.property.toLowerCase();
  const direction = sort.direction;
  return miracles.sort((a, b) => {
    let x = a[property];
    let y = b[property];
    /**
     * For handling categories
     * Expecting categories to be an array already sorted
     */
    if (Array.isArray(x) && Array.isArray(y)) {
      x = x.join(',');
      y = y.join(',');
    }
    if (property === "year") {
      x = oddDateConversion[x] || x;
      y = oddDateConversion[y] || y;
      x = Number(x);
      y = Number(y);
    }
    if (x < y) {
      return direction === 'Ascending' ? -1 : 1;
    }
    if (x > y) {
      return direction === 'Ascending' ? 1 : -1;
    }
    // property must be equal
    return 0;
  });
}

/**
 * Most miracles are years except for the following
 * So we will do a quick conversion so sort by year works properly 
 * yaya so this is hard coded, will need to be careful adding new miracles
 */
const oddDateConversion: Record<string, number> = {
  "Third - Fifth Centuries": 300,
  "Seventh Century": 700,
  "1222-1465": 122,
  "May 5, 2001": 2001,
  "750 A.D": 850,
  "1273-1280": 1273,
  "Sixth - Seventh Centuries": 600,
  "Eleventh Century": 1100,
  "October 21, 2006": 2006,
  "October 12, 2008": 2008,
  "December 8, 1991": 1991,
}

const miracles = [
  {
    "country": "Argentina",
    "city": "Buenos Aires",
    "year": "1992",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        -58.380427228011285,
        -34.603101207984515
      ]
    ],
    "endpoint": "/Argentina/Buenos%20Aires/1992/part1",
    "path": "argentina/buenos_aires_1.json"
  },
  {
    "country": "Argentina",
    "city": "Buenos Aires",
    "year": "1994",
    "categories": [
      "flesh",
      "science",
      "tissue"
    ],
    "coordinates": [
      [
        -58.380427228011285,
        -34.603101207984515
      ]
    ],
    "endpoint": "/Argentina/Buenos%20Aires/1994/part2",
    "path": "argentina/buenos_aires_2.json"
  },
  {
    "country": "Argentina",
    "city": "Buenos Aires",
    "year": "1996",
    "categories": [
      "preservation",
      "science",
      "tissue"
    ],
    "coordinates": [
      [
        -58.380427228011285,
        -34.603101207984515
      ]
    ],
    "endpoint": "/Argentina/Buenos%20Aires/1996/part3",
    "path": "argentina/buenos_aires_3.json"
  },
  {
    "country": "Austria",
    "city": "Fiecht",
    "year": "1310",
    "categories": [
      "blood",
      "doubt",
      "preservation"
    ],
    "coordinates": [
      [
        11.7,
        47.35
      ]
    ],
    "endpoint": "/Austria/Fiecht/1310",
    "path": "austria/fiecht.json"
  },
  {
    "country": "Austria",
    "city": "Seefeld",
    "year": "1384",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        11.185503284428165,
        47.330347258989974
      ]
    ],
    "endpoint": "/Austria/Seefeld/1384",
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
    "coordinates": [
      [
        15.264916430152601,
        48.29422169540734
      ],
      [
        15.27497215216164,
        48.3405801067846
      ]
    ],
    "endpoint": "/Austria/Weiten-Raxendorf/1411",
    "path": "austria/weiten-raxendorf.json"
  },
  {
    "country": "Belgium",
    "city": "Bois-Seigneur-Isaac",
    "year": "1405",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        4.317949716002352,
        50.643138151368035
      ]
    ],
    "endpoint": "/Belgium/Bois-Seigneur-Isaac/1405",
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
    "coordinates": [
      [
        4.349836284393418,
        50.84816074328751
      ]
    ],
    "endpoint": "/Belgium/Brussels/1370",
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
    "coordinates": [
      [
        4.834101542832338,
        51.17733712817109
      ]
    ],
    "endpoint": "/Belgium/Herentals/1412",
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
    "coordinates": [
      [
        5.280228698987882,
        50.95630350695051
      ]
    ],
    "endpoint": "/Belgium/Herkenrode-Hasselt/1317",
    "path": "belgium/herkenrode-hasselt.json"
  },
  {
    "country": "Belgium",
    "city": "Middleburg-Lovanio",
    "year": "1374",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        3.4121774490888903,
        51.25588852502535
      ],
      [
        4.7002160202448335,
        50.87904314256116
      ]
    ],
    "endpoint": "/Belgium/Middleburg-Lovanio/1374",
    "path": "belgium/middleburg-lovanio.json"
  },
  {
    "country": "Colombia",
    "city": "Tumaco",
    "year": "1906",
    "categories": [
      "flood"
    ],
    "coordinates": [
      [
        -78.76732215742587,
        1.8106377789343184
      ]
    ],
    "endpoint": "/Colombia/Tumaco/1906",
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
    "coordinates": [
      [
        16.617043701477666,
        46.25070277522832
      ]
    ],
    "endpoint": "/Croatia/Ludbreg/1411",
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
    "coordinates": [
      [
        30.248638400186216,
        30.504095067534468
      ]
    ],
    "endpoint": "/Egypt/Scete/Third%20-%20Fifth%20Centuries",
    "path": "egypt/scete.json"
  },
  {
    "country": "Egypt",
    "city": "St. Mary of Egypt",
    "year": "Seventh Century",
    "categories": [],
    "coordinates": [
      [
        31.20704097572857,
        30.132417916251722
      ]
    ],
    "endpoint": "/Egypt/St.%20Mary%20of%20Egypt/Seventh%20Century",
    "path": "egypt/st_mary_of_egypt.json"
  },
  {
    "country": "France",
    "city": "Avignon",
    "year": "1433",
    "categories": [
      "flood"
    ],
    "coordinates": [
      [
        4.802355361090868,
        43.94869824453833
      ]
    ],
    "endpoint": "/France/Avignon/1433",
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
    "coordinates": [
      [
        4.7351838558601465,
        46.47562315792403
      ]
    ],
    "endpoint": "/France/Blanot/1331",
    "path": "france/blanot.json"
  },
  {
    "country": "France",
    "city": "Bordeaux",
    "year": "1822",
    "categories": [
      "face"
    ],
    "coordinates": [
      [
        -0.5832660520376958,
        44.84253574364193
      ]
    ],
    "endpoint": "/France/Bordeaux/1822",
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
    "coordinates": [
      [
        5.047324833916243,
        47.33081526575888
      ]
    ],
    "endpoint": "/France/Dijon/1430",
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
    "coordinates": [
      [
        3.078568347498056,
        50.368235830229594
      ]
    ],
    "endpoint": "/France/Douai/1254",
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
    "coordinates": [
      [
        6.105394143242124,
        47.767661324315505
      ]
    ],
    "endpoint": "/France/Faverney/1608",
    "path": "france/faverney.json"
  },
  {
    "country": "France",
    "city": "La Rochelle",
    "year": "1461",
    "categories": [],
    "coordinates": [
      [
        -1.1518487641566078,
        46.16030972648806
      ]
    ],
    "endpoint": "/France/La%20Rochelle/1461",
    "path": "france/la_rochelle.json"
  },
  {
    "country": "France",
    "city": "Les Ulmes",
    "year": "1668",
    "categories": [
      "face"
    ],
    "coordinates": [
      [
        -0.1802117821916865,
        47.220034175719945
      ]
    ],
    "endpoint": "/France/Les%20Ulmes/1668",
    "path": "france/les_ulmes.json"
  },
  {
    "country": "France",
    "city": "Marseille-Eu-Beauvais",
    "year": "1533",
    "categories": [
      "theft"
    ],
    "coordinates": [
      [
        5.366912324246467,
        43.302555086678616
      ]
    ],
    "endpoint": "/France/Marseille-Eu-Beauvais/1533",
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
    "coordinates": [
      [
        2.3526984704160814,
        48.85760521906473
      ]
    ],
    "endpoint": "/France/Paris/1290",
    "path": "france/paris.json"
  },
  {
    "country": "France",
    "city": "Pressac",
    "year": "1643",
    "categories": [
      "fire"
    ],
    "coordinates": [
      [
        0.566006200100576,
        46.11587260028606
      ]
    ],
    "endpoint": "/France/Pressac/1643",
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
    "coordinates": [
      [
        10.897747641826326,
        48.36909064227163
      ]
    ],
    "endpoint": "/Germany/Augsburg/1194",
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
    "coordinates": [
      [
        10.21179465523487,
        47.96750596503706
      ]
    ],
    "endpoint": "/Germany/Benningen/1216",
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
    "coordinates": [
      [
        11.555347928914562,
        48.8747985904799
      ]
    ],
    "endpoint": "/Germany/Bettbrunn/1125",
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
    "coordinates": [
      [
        11.907112791304824,
        48.30625380379896
      ]
    ],
    "endpoint": "/Germany/Erding/1417",
    "path": "germany/erding.json"
  },
  {
    "country": "Germany",
    "city": "Kranenburg, District of Kleve",
    "year": "1280",
    "categories": [],
    "coordinates": [
      [
        6.008243854685665,
        51.78630834478586
      ]
    ],
    "endpoint": "/Germany/Kranenburg,%20District%20of%20Kleve/1280",
    "path": "germany/kranenburg_district_of_kleve.json"
  },
  {
    "country": "Germany",
    "city": "Regensburg",
    "year": "1255",
    "categories": [
      "doubt"
    ],
    "coordinates": [
      [
        12.101757678534742,
        49.01313856219421
      ]
    ],
    "endpoint": "/Germany/Regensburg/1255",
    "path": "germany/regensburg.json"
  },
  {
    "country": "Germany",
    "city": "Walldurn",
    "year": "1330",
    "categories": [
      "face"
    ],
    "coordinates": [
      [
        9.361084971076668,
        49.58182351534291
      ]
    ],
    "endpoint": "/Germany/Walldurn/1330",
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
    "coordinates": [
      [
        11.949358991431106,
        52.95504414291643
      ]
    ],
    "endpoint": "/Germany/Wilsnack/1383",
    "path": "germany/wilsnack.json"
  },
  {
    "country": "Netherlands",
    "city": "Alkmaar",
    "year": "1429",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        4.753318268310122,
        52.632883068968354
      ]
    ],
    "endpoint": "/Netherlands/Alkmaar/1429",
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
    "coordinates": [
      [
        4.893659028911645,
        52.36721672741879
      ]
    ],
    "endpoint": "/Netherlands/Amsterdam/1345",
    "path": "holland/amsterdam.json"
  },
  {
    "country": "Netherlands",
    "city": "Bergen",
    "year": "1421",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        4.7069406016743915,
        52.67480967230775
      ]
    ],
    "endpoint": "/Netherlands/Bergen/1421",
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
    "coordinates": [
      [
        5.957023376059402,
        51.64532923730793
      ]
    ],
    "endpoint": "/Netherlands/Boxmeer/1400",
    "path": "holland/boxmeer.json"
  },
  {
    "country": "Netherlands",
    "city": "Boxtel-Hoogstraten",
    "year": "1380",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        5.312292616747941,
        51.60189144450432
      ],
      [
        4.7594443109897835,
        51.404873005733506
      ]
    ],
    "endpoint": "/Netherlands/Boxtel-Hoogstraten/1380",
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
    "coordinates": [
      [
        4.765369702781071,
        51.572278625293514
      ]
    ],
    "endpoint": "/Netherlands/Breda-Niervaart/1300",
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
    "coordinates": [
      [
        5.751628225258717,
        50.88489018438606
      ]
    ],
    "endpoint": "/Netherlands/Meerssen/1222-1465",
    "path": "holland/meerssen.json"
  },
  {
    "country": "Netherlands",
    "city": "Stiphout",
    "year": "1342",
    "categories": [
      "fire"
    ],
    "coordinates": [
      [
        5.6184787229189075,
        51.48599077205647
      ]
    ],
    "endpoint": "/Netherlands/Stiphout/1342",
    "path": "holland/stiphout.json"
  },
  {
    "country": "India",
    "city": "Archdiocese of Trivandrum",
    "year": "May 5, 2001",
    "categories": [
      "face"
    ],
    "coordinates": [
      [
        76.83867180560793,
        8.9813915337447
      ]
    ],
    "endpoint": "/India/Archdiocese%20of%20Trivandrum/May%205,%202001",
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
    "coordinates": [
      [
        13.33880506545787,
        41.72693702899531
      ]
    ],
    "endpoint": "/Italy/Alatri/1228",
    "path": "italy/alatri.json"
  },
  {
    "country": "Italy",
    "city": "Saint Clare of Assisi",
    "year": "1240",
    "categories": [],
    "coordinates": [
      [
        12.618927944607501,
        43.070711027903194
      ]
    ],
    "endpoint": "/Italy/Saint%20Clare%20of%20Assisi/1240",
    "path": "italy/assisi.json"
  },
  {
    "country": "Italy",
    "city": "Asti",
    "year": "1535",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        8.206105412141332,
        44.90125087527754
      ]
    ],
    "endpoint": "/Italy/Asti/1535",
    "path": "italy/asti_1.json"
  },
  {
    "country": "Italy",
    "city": "Asti",
    "year": "1718",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        8.206105412141332,
        44.90125087527754
      ]
    ],
    "endpoint": "/Italy/Asti/1718",
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
    "coordinates": [
      [
        11.959534806731979,
        43.836808794891574
      ]
    ],
    "endpoint": "/Italy/Bagno%20di%20Romagna/1412",
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
    "coordinates": [
      [
        11.985112742883903,
        42.64461367722893
      ]
    ],
    "endpoint": "/Italy/Bolsena/1264",
    "path": "italy/bolsena.json"
  },
  {
    "country": "Italy",
    "city": "Canosio",
    "year": "1630",
    "categories": [
      "flood"
    ],
    "coordinates": [
      [
        7.081548252190529,
        44.4551400897048
      ]
    ],
    "endpoint": "/Italy/Canosio/1630",
    "path": "italy/canosio.json"
  },
  {
    "country": "Italy",
    "city": "Cascia",
    "year": "1330",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        13.013718733800824,
        42.716833066937305
      ]
    ],
    "endpoint": "/Italy/Cascia/1330",
    "path": "italy/cascia.json"
  },
  {
    "country": "Italy",
    "city": "Cava dei Tirreni",
    "year": "1656",
    "categories": [],
    "coordinates": [
      [
        14.703963867615583,
        40.70386467752794
      ]
    ],
    "endpoint": "/Italy/Cava%20dei%20Tirreni/1656",
    "path": "italy/cava_dei_tirreni.json"
  },
  {
    "country": "Italy",
    "city": "Dronero",
    "year": "1631",
    "categories": [
      "fire"
    ],
    "coordinates": [
      [
        7.36745032012151,
        44.46347342647197
      ]
    ],
    "endpoint": "/Italy/Dronero/1631",
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
    "coordinates": [
      [
        11.617088632431855,
        44.83921984084136
      ]
    ],
    "endpoint": "/Italy/Ferrara/1171",
    "path": "italy/ferrara.json"
  },
  {
    "country": "Italy",
    "city": "Florence",
    "year": "1230",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        11.248461953846778,
        43.775497265352975
      ]
    ],
    "endpoint": "/Italy/Florence/1230",
    "path": "italy/florence_1.json"
  },
  {
    "country": "Italy",
    "city": "Florence",
    "year": "1595",
    "categories": [
      "fire"
    ],
    "coordinates": [
      [
        11.248461953846778,
        43.775497265352975
      ]
    ],
    "endpoint": "/Italy/Florence/1595",
    "path": "italy/florence_2.json"
  },
  {
    "country": "Italy",
    "city": "Gruaro (Valvasone)",
    "year": "1294",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        12.843345375761915,
        45.8333086443474
      ]
    ],
    "endpoint": "/Italy/Gruaro%20(Valvasone)/1294",
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
    "coordinates": [
      [
        14.389689825834072,
        42.22525647501123
      ]
    ],
    "endpoint": "/Italy/Lanciano/750%20A.D",
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
    "coordinates": [
      [
        13.455181399617445,
        43.29839068757261
      ]
    ],
    "endpoint": "/Italy/Macerata/1356",
    "path": "italy/macerata.json"
  },
  {
    "country": "Italy",
    "city": "Mogoro",
    "year": "1604",
    "categories": [
      "weight"
    ],
    "coordinates": [
      [
        8.775021704596858,
        39.68235516551309
      ]
    ],
    "endpoint": "/Italy/Mogoro/1604",
    "path": "italy/mogoro.json"
  },
  {
    "country": "Italy",
    "city": "Morrovalle",
    "year": "1560",
    "categories": [
      "fire"
    ],
    "coordinates": [
      [
        13.582512446214178,
        43.31512905621321
      ]
    ],
    "endpoint": "/Italy/Morrovalle/1560",
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
    "coordinates": [
      [
        13.693141962961615,
        42.936605178665005
      ]
    ],
    "endpoint": "/Italy/Offida/1273-1280",
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
    "coordinates": [
      [
        15.734804892601554,
        40.37857552552136
      ],
      [
        14.267201202670707,
        40.852627697437406
      ]
    ],
    "endpoint": "/Italy/Patierno%20(Naples)/1772",
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
    "coordinates": [
      [
        12.566355979489877,
        44.05808613002166
      ]
    ],
    "endpoint": "/Italy/Rimini/1227",
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
    "coordinates": [
      [
        12.487413118930732,
        41.89734828943418
      ]
    ],
    "endpoint": "/Italy/Rome/Sixth%20-%20Seventh%20Centuries",
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
    "coordinates": [
      [
        12.487413118930732,
        41.89734828943418
      ]
    ],
    "endpoint": "/Italy/Rome/1610",
    "path": "italy/rome_3.json"
  },
  {
    "country": "Italy",
    "city": "Salzano",
    "year": "1517",
    "categories": [
      "animals"
    ],
    "coordinates": [
      [
        12.103502776702083,
        45.521231537414124
      ]
    ],
    "endpoint": "/Italy/Salzano/1517",
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
    "coordinates": [
      [
        15.29055221549396,
        40.123954973341874
      ]
    ],
    "endpoint": "/Italy/San%20Mauro%20Lu%20Bruca/1969",
    "path": "italy/san_mauro_la_bruca.json"
  },
  {
    "country": "Italy",
    "city": "Scala",
    "year": "1732",
    "categories": [],
    "coordinates": [
      [
        14.608333926680416,
        40.65576052941164
      ]
    ],
    "endpoint": "/Italy/Scala/1732",
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
    "coordinates": [
      [
        11.33056731850384,
        43.31850445204576
      ]
    ],
    "endpoint": "/Italy/Siena/1730",
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
    "coordinates": [
      [
        12.749803275540332,
        43.507518538562024
      ]
    ],
    "endpoint": "/Italy/St.%20Peter%20Damian/Eleventh%20Century",
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
    "coordinates": [
      [
        16.419627002740057,
        41.276589902927746
      ]
    ],
    "endpoint": "/Italy/Trani/Eleventh%20Century",
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
    "coordinates": [
      [
        7.6914656458277175,
        45.072789430907
      ]
    ],
    "endpoint": "/Italy/Turin/1453",
    "path": "italy/turin_1.json"
  },
  {
    "country": "Italy",
    "city": "Turin",
    "year": "1640",
    "categories": [
      "fire"
    ],
    "coordinates": [
      [
        7.6914656458277175,
        45.072789430907
      ]
    ],
    "endpoint": "/Italy/Turin/1640",
    "path": "italy/turin_3.json"
  },
  {
    "country": "Italy",
    "city": "Veroli",
    "year": "1570",
    "categories": [
      "face"
    ],
    "coordinates": [
      [
        13.418649195805772,
        41.69257417660216
      ]
    ],
    "endpoint": "/Italy/Veroli/1570",
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
    "coordinates": [
      [
        10.855344819135217,
        43.40441310014632
      ]
    ],
    "endpoint": "/Italy/Volterra/1472",
    "path": "italy/volterra.json"
  },
  {
    "country": "Caribbean Island of Martinique",
    "city": "Morne-Rouge",
    "year": "1902",
    "categories": [
      "face"
    ],
    "coordinates": [
      [
        -61.13400259304196,
        14.772858952511548
      ]
    ],
    "endpoint": "/Caribbean%20Island%20of%20Martinique/Morne-Rouge/1902",
    "path": "martinique/morne-rouge.json"
  },
  {
    "country": "Mexico",
    "city": "Tixtla",
    "year": "October 21, 2006",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        -99.39953979859278,
        17.56772407180631
      ]
    ],
    "endpoint": "/Mexico/Tixtla/October%2021,%202006/part1",
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
    "coordinates": [
      [
        -99.39953979859278,
        17.56772407180631
      ]
    ],
    "endpoint": "/Mexico/Tixtla/October%2021,%202006/part2",
    "path": "mexico/tixtla_2.json"
  },
  {
    "country": "Peru",
    "city": "Eten",
    "year": "1649",
    "categories": [
      "face"
    ],
    "coordinates": [
      [
        -79.86434680109905,
        -6.926247196000024
      ]
    ],
    "endpoint": "/Peru/Eten/1649",
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
    "coordinates": [
      [
        20.365938679212757,
        53.959650151348235
      ]
    ],
    "endpoint": "/Poland/Glotowo/1290",
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
    "coordinates": [
      [
        19.94299239520395,
        50.06516622341976
      ]
    ],
    "endpoint": "/Poland/Krakow/1345",
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
    "coordinates": [
      [
        16.156686311399877,
        51.20715391403807
      ]
    ],
    "endpoint": "/Poland/Legnica/2013",
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
    "coordinates": [
      [
        16.931857662077153,
        52.40499669186131
      ]
    ],
    "endpoint": "/Poland/Poznan/1399",
    "path": "poland/poznan.json"
  },
  {
    "country": "Poland",
    "city": "Sokółka",
    "year": "October 12, 2008",
    "categories": [
      "science",
      "tissue"
    ],
    "coordinates": [
      [
        23.50272139750997,
        53.40595947770447
      ]
    ],
    "endpoint": "/Poland/Sok%C3%B3%C5%82ka/October%2012,%202008/part1",
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
    "coordinates": [
      [
        23.50272139750997,
        53.40595947770447
      ]
    ],
    "endpoint": "/Poland/Sok%C3%B3%C5%82ka/October%2012,%202008/part2",
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
    "coordinates": [
      [
        23.50272139750997,
        53.40595947770447
      ]
    ],
    "endpoint": "/Poland/Sok%C3%B3%C5%82ka/October%2012,%202008/part3",
    "path": "poland/sokółka_3.json"
  },
  {
    "country": "Portugal",
    "city": "Santarém",
    "year": "1247",
    "categories": [
      "blood",
      "face",
      "light",
      "sorcery",
      "theft"
    ],
    "coordinates": [
      [
        -8.68509654614398,
        39.236597267915634
      ]
    ],
    "endpoint": "/Portugal/Santar%C3%A9m/1247",
    "path": "portugal/santarem.json"
  },
  {
    "country": "Réunion",
    "city": "Saint André",
    "year": "1902",
    "categories": [
      "face"
    ],
    "coordinates": [
      [
        55.65346500470871,
        -20.96012982239351
      ]
    ],
    "endpoint": "/R%C3%A9union/Saint%20Andr%C3%A9/1902",
    "path": "reunion/saint_andre.json"
  },
  {
    "country": "Spain",
    "city": "Alboraya-Almácera",
    "year": "1348",
    "categories": [
      "animals"
    ],
    "coordinates": [
      [
        -0.35177227951536877,
        39.50007343782357
      ]
    ],
    "endpoint": "/Spain/Alboraya-Alm%C3%A1cera/1348",
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
    "coordinates": [
      [
        -3.3691651190158405,
        40.48480077913516
      ]
    ],
    "endpoint": "/Spain/Alcal%C3%A1/1597",
    "path": "spain/alcala.json"
  },
  {
    "country": "Spain",
    "city": "Alcoy",
    "year": "1568",
    "categories": [
      "theft"
    ],
    "coordinates": [
      [
        -0.48043155444748953,
        38.698672619346006
      ]
    ],
    "endpoint": "/Spain/Alcoy/1568",
    "path": "spain/alcoy.json"
  },
  {
    "country": "Spain",
    "city": "Caravaca de La Cruz",
    "year": "1231",
    "categories": [
      "face"
    ],
    "coordinates": [
      [
        -1.8611924194561793,
        38.10432771362119
      ]
    ],
    "endpoint": "/Spain/Caravaca%20de%20La%20Cruz/1231",
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
    "coordinates": [
      [
        -1.774399765472321,
        41.101666274931915
      ]
    ],
    "endpoint": "/Spain/Cimballa/1370",
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
    "coordinates": [
      [
        -1.4150485924925549,
        41.1148808431742
      ]
    ],
    "endpoint": "/Spain/Daroca/1239",
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
    "coordinates": [
      [
        2.8233019299228235,
        41.98318324047948
      ]
    ],
    "endpoint": "/Spain/Gerona/1297",
    "path": "spain/gerona.json"
  },
  {
    "country": "Netherlands-Spain",
    "city": "Gorkum-Escorial",
    "year": "1572",
    "categories": [
      "blood"
    ],
    "coordinates": [
      [
        4.974799283359529,
        51.83720155004567
      ],
      [
        -4.125181828848294,
        40.58443048186775
      ]
    ],
    "endpoint": "/Netherlands-Spain/Gorkum-Escorial/1572",
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
    "coordinates": [
      [
        -5.326987068899295,
        39.45152187587227
      ]
    ],
    "endpoint": "/Spain/Guadalupe/1420",
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
    "coordinates": [
      [
        1.3927124010570064,
        41.77159254263068
      ]
    ],
    "endpoint": "/Spain/Ivorra/1010",
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
    "coordinates": [
      [
        -0.39348216375313066,
        39.545484879940005
      ]
    ],
    "endpoint": "/Spain/Moncada/1392",
    "path": "spain/moncada.json"
  },
  {
    "country": "Spain",
    "city": "Montserrat",
    "year": "1657",
    "categories": [],
    "coordinates": [
      [
        -0.6011429219711684,
        39.35823549696924
      ]
    ],
    "endpoint": "/Spain/Montserrat/1657",
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
    "coordinates": [
      [
        -7.04367768677811,
        42.707934076122164
      ]
    ],
    "endpoint": "/Spain/O'Cebreiro/1300",
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
    "coordinates": [
      [
        -0.6729050954798383,
        38.62949027392014
      ]
    ],
    "endpoint": "/Spain/Onil/1824",
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
    "coordinates": [
      [
        -6.598179109247415,
        42.54827688216941
      ]
    ],
    "endpoint": "/Spain/Ponferrada/1533",
    "path": "spain/ponferrada.json"
  },
  {
    "country": "Spain",
    "city": "Saint John of the Abbesses",
    "year": "1251",
    "categories": [
      "preservation"
    ],
    "coordinates": [
      [
        2.2871237129358937,
        42.23621449558365
      ]
    ],
    "endpoint": "/Spain/Saint%20John%20of%20the%20Abbesses/1251",
    "path": "spain/saint_john_of_the_abbesses.json"
  },
  {
    "country": "Spain",
    "city": "Silla",
    "year": "1907",
    "categories": [
      "theft"
    ],
    "coordinates": [
      [
        -0.41563321587732,
        39.361773644502875
      ]
    ],
    "endpoint": "/Spain/Silla/1907",
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
    "coordinates": [
      [
        -0.8848530069973266,
        41.647456521398524
      ]
    ],
    "endpoint": "/Spain/Zaragoza/1427",
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
    "coordinates": [
      [
        8.019146144604022,
        47.15014500788676
      ]
    ],
    "endpoint": "/Switzerland/Ettiswil/1447",
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
    "coordinates": [
      [
        -72.43804640225625,
        7.460110518352143
      ]
    ],
    "endpoint": "/Venezuela/Betania/December%208,%201991",
    "path": "venezuela/betania.json"
  }
]

export {
  colorMap,
  getMiracle,
  getPath,
  handleCategoryFilters,
  handleCountryFilters,
  handleSearchFilters,
  handleSort,
  miracles,
}