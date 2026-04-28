import { useState } from 'react';
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
import { CardView } from './CardView';
import { miracles } from './data/miracles';
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

  return (
    <Box>
      <Hero />
      <Page background='background-front'>
        <PageContent gap='xlarge'>
          <PageHeader
            title="Miracles List"
            subtitle={`A catalog of every reported Eucharistic miracle in the world.`}
          />
          <Paragraph margin="none">
            Discover, analyze, and share quality data. Learn more about data types, creating, and collaborating.
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
                setData={setData}
                setFilters={setFilters}
                setNumFilters={setNumFilters}
                setShowLayer={setShowLayer}
                setToggleGroupValue={setToggleGroupValue}
                toggleGroupValue={toggleGroupValue}
              />
              <DataSummary />
              { toggleGroupValue === 'table' && <MiraclesDataTable /> }
              { toggleGroupValue === 'map' && <MiraclesMap miracles={data}/> }
              { toggleGroupValue === 'card' && <CardView /> }
            </Data>
            {showLayer && (
              <MiraclesFilters
                filters={filters}
                setData={setData}
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