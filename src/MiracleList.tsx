import { useMemo, useState } from 'react';
import {
  Box,
  Data,
  DataSummary,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
} from 'grommet';
import { useSelector } from 'react-redux';
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
  const [showLayer, setShowLayer] = useState(false);
  const selectedCategories = useSelector(state => state.filters.categories); 
  const selectedCountries = useSelector(state => state.filters.countries); 
  const searchValue = useSelector(state => state.search.value);
  const toggleGroupValue = useSelector(state => state.toggleGroup.value); 

  const data = useMemo(() => {
    let filteredMiracles = miracles;
    filteredMiracles = handleCountryFilters(filteredMiracles, selectedCountries);
    filteredMiracles = handleCategoryFilters(filteredMiracles, selectedCategories);
    filteredMiracles = handleSearchFilters(filteredMiracles, searchValue);
    return filteredMiracles;
  }, [selectedCountries, selectedCategories, searchValue])

  return (
    <Box>
      <Hero />
      <Page background='background-front' pad={{ bottom: 'xlarge' }} flex='grow'>
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
              <MiraclesToolbar setShowLayer={setShowLayer}/>
              <DataSummary />
              { toggleGroupValue === 'table' && <MiraclesDataTable /> }
              { toggleGroupValue === 'map' && <MiraclesMap miracles={data}/> }
              { toggleGroupValue === 'card' && <MiraclesCards /> }
            </Data>
            {showLayer && (
              <MiraclesFilters setShowLayer={setShowLayer}/>
            )}
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}