import { useState, useEffect } from 'react';
import {
  Box,
  Data,
  DataSummary,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
} from 'grommet';
import { Hero } from './Hero';
import {
  handleCountryFilters,
  handleCategoryFilters,
  handleSearchFilters,
  miracles,
} from './data/miracles';
import { MiraclesCards } from './MiraclesCards';
import { MiraclesDataTable } from './MiraclesDataTable';
import { MiraclesFilters } from './MiraclesFilters';
import { MiraclesMap } from './MiraclesMap';
import { MiraclesToolbar } from './MiraclesToolbar';

export const MiracleList = () => {
  const defaultFilters = {
    countries: [],
    categories: [],
  }
  const [toggleGroupValue, setToggleGroupValue] = useState('table');
  const [data, setData] = useState(miracles);
  const [showLayer, setShowLayer] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [numFilters, setNumFilters] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    let filteredMiracles = miracles;
    filteredMiracles = handleCountryFilters(filteredMiracles, filters.countries);
    filteredMiracles = handleCategoryFilters(filteredMiracles, filters.categories);
    filteredMiracles = handleSearchFilters(filteredMiracles, searchInput);
    setData(filteredMiracles);
  }, [filters, searchInput])

  return (
    <Box>
      <Hero />
      <Page background='background-front' pad={{ bottom: 'xlarge' }}>
        <PageContent gap='xlarge'>
          <PageHeader
            title="Miracles List"
            subtitle={`A catalog of every reported Eucharistic miracle in the world.`}
          />
          <Paragraph margin="none">
            Discover, analyze, and share Eucharistic miracles. Examine historical accounts, scientific findings, and centuries of documented tradition.
          </Paragraph>
          <Box gap='medium'>
            <Data
              data={data}
              properties={{
                country: { label: 'Country' },
                categories: { label: 'Category' }
              }}
            >
              <MiraclesToolbar
                defaultFilters={defaultFilters}
                numFilters={numFilters}
                setFilters={setFilters}
                setNumFilters={setNumFilters}
                setSearchInput={setSearchInput}
                setShowLayer={setShowLayer}
                setToggleGroupValue={setToggleGroupValue}
                toggleGroupValue={toggleGroupValue}
              />
              <DataSummary />
              { toggleGroupValue === 'table' && <MiraclesDataTable /> }
              { toggleGroupValue === 'map' && <MiraclesMap miracles={data}/> }
              { toggleGroupValue === 'card' && <MiraclesCards /> }
            </Data>
            {showLayer && (
              <MiraclesFilters
                filters={filters}
                setFilters={setFilters}
                setNumFilters={setNumFilters}
                setShowLayer={setShowLayer}
              />
            )}
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}