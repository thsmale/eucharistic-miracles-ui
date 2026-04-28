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
import { ParentSize } from '@visx/responsive';
import { Hero } from './Hero';
import { CardView } from './CardView';
import { miracles } from './data/miracles';
import WorldMap from './Map';
import MapChart from './SimpleMap';
import { MiraclesDataTable } from './MiraclesDataTable';
import { MiraclesFilters } from './MiraclesFilters';


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
  const [value, setValue] = useState('table');
  const [data, setData] = useState(miracles);
  const [showLayer, setShowLayer] = useState(false);

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
                <Button
                  icon={<Filter />}
                  onClick={() => setShowLayer(true)}
                  tip="Open filters"
                />
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
              { value === 'map' && (
                <Box pad={{ bottom: 'xlarge' }}>
                  {<MapChart miracles={data}/>}
                </Box>
              )}
              { value === 'card' && <CardView /> }
            </Data>
            {showLayer && (
              <MiraclesFilters setShowLayer={setShowLayer} />
            )}
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}