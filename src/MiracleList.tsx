import { useState } from 'react';
import {
  Box,
  Button,
  Data,
  DataSummary,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  Stack,
  Text,
  TextInput,
  ToggleGroup,
} from 'grommet';
import {
  AppsRounded,
  Filter,
  Map,
  Search,
  Table,
} from 'grommet-icons';
import { Hero } from './Hero';
import { CardView } from './CardView';
import { miracles } from './data/miracles';
import { MiraclesDataTable } from './MiraclesDataTable';
import { MiraclesFilters } from './MiraclesFilters';
import { MiraclesMap } from './MiraclesMap';


const toggleOptions = [
  {
    icon: <Table a11yTitle='Table view' />,
    value: 'table',
    tip: 'Table',
  },
  {
    icon: <Map a11yTitle='Map view' />,
    value: 'map',
    tip: 'Map',
  },
  {
    icon: <AppsRounded a11yTitle='Card view' />,
    value: 'card',
    tip: 'Card',
  },
]


export const MiracleList = () => {
  const defaultFilters = {
    countries: [],
    categories: [],
  }
  const [value, setValue] = useState('table');
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
              <Box direction='row'>
                <Box width='medium'>
                  <TextInput
                    icon={<Search />}
                    placeholder="Search miracles"
                  />
                </Box>
                <Box direction='row'>
                  <Stack anchor='top-right'>
                    <Button
                      icon={<Filter />}
                      onClick={() => setShowLayer(true)}
                      tip={numFilters > 0 ? `Open filters, ${numFilters} filters applied` : 'Open filters'}
                    />
                    <Box
                      background='brand'
                      pad={{ horizontal: 'xsmall' }}
                      round
                    >
                      <Text>{numFilters > 0 ? numFilters : ''}</Text>
                    </Box>
                  </Stack>
                  {numFilters > 0 && (
                    <Box pad={{ horizontal: 'xsmall' }}>
                      <Button
                        label='Clear filters'
                        onClick={() => {
                          setFilters(defaultFilters);
                          setNumFilters(0)
                          setData(miracles);
                        }}
                      />
                    </Box>
                  )}
                </Box>
                <ToggleGroup
                  onToggle={e => {
                    if (e.value.length) setValue(e.value);
                  }}
                  value={value}
                  options={toggleOptions}
                />
              </Box>
              <DataSummary />
              { value === 'table' && <MiraclesDataTable /> }
              { value === 'map' && <MiraclesMap miracles={data}/> }
              { value === 'card' && <CardView /> }
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