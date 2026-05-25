/**
 * A collection of functions used through out the app
 * Utility functions for anything to do with data
 */
import { createContext } from 'react';
import Fuse from 'fuse.js';
import { miracles } from './miraclesMetadata';
import {
  type MiracleMetadata,
  type MiracleMetadataGroupByCountry,
} from './types'
import { type SortState } from '../redux/sort';

const DeviceContext = createContext<boolean>(false)

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
 * Returning null here as an indicator that getPath failed
 * versus location.state.path would be undefined 
 * so you can trace to see how the app failed in a 404
 * pretty hacky... should handle this better
 */
const getPath = (endpoint: string) => {
  const miracle = miracles.find(miracle => miracle.endpoint === endpoint);
  return miracle?.path || null;
}

const handleCategoryFilters = (miracles: MiracleMetadata[], categories: string[]) => {
  if (categories.length === 0) return miracles;
  return miracles.filter(miracle => {
    if (categories.some(category => miracle.categories.includes(category))) {
      return true;
    }
    return false;
  })
}

const handleCountryFilters = (miracles: MiracleMetadata[], countries: string[]) => {
  if (countries.length === 0) return miracles;
  return miracles.filter((miracle) => (
    // Split only applies to one miracle, Netherlands-Spain
    miracle.country.split('-').some(country => countries.includes(country))
  ))
}

const handleSearchFilters = (miracles: MiracleMetadata[], searchInput: string) => {
  if (searchInput === '') return miracles;
  const fuse = new Fuse(miracles, {
    ignoreDiacritics: true,
    keys: ['country', 'city', 'year', 'categories'],
    threshold: 0.2,
  });
  const results = fuse.search(searchInput);
  return results.map(result => result.item);
}

const handleSort = (miracles: MiracleMetadata[], sort: SortState) => {
  const property = sort.property.toLowerCase() as "country" | "city" | "year" | "categories"
  const direction = sort.direction;
  return miracles.sort((a, b) => {
    let x: string | string[] | number = a[property];
    let y: string | string[] | number = b[property];
    /**
     * For handling categories
     * Expecting categories to be an array already sorted
     */
    if (Array.isArray(x) && Array.isArray(y)) {
      x = x.join(',');
      y = y.join(',');
    }
    if (property === "year") {
      x = oddDateConversion[x as string] || x;
      y = oddDateConversion[y as string] || y;
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
 * If sort by country, then sort those by asc/desc
 * Otherwise, countries will be sorted by asc
 * Then each AccordionPanel will be sorted by city, year, categories by asc/desc
 * Currently, assuming only used by MiraclesAccordion
 */
const handleGroupSort = (miracles: MiracleMetadataGroupByCountry, sort: SortState) => {
  const property = sort.property.toLowerCase() as "country" | "city" | "year" | "categories"
  if (property === 'country') {
    // Assuming sort by country was already done in Miracles
    return miracles;
  }
  Object.keys(miracles).forEach(country => {
    miracles[country] = handleSort(miracles[country], sort);
  });
  const sortedData = Object.fromEntries(Object.entries(miracles).sort());
  return sortedData;
}

const miraclesMetadataLength = miracles.length;

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

export {
  DeviceContext,
  colorMap,
  getPath,
  handleCategoryFilters,
  handleCountryFilters,
  handleSearchFilters,
  handleSort,
  handleGroupSort,
  miraclesMetadataLength,
}