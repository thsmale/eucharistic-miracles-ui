import { useState } from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  Grommet,
  Heading,
  Text,
  ToggleGroup,
  Toolbar,
} from 'grommet';
import {
  AppsRounded,
  Map,
  Table,
} from 'grommet-icons';
import { CardView } from './CardView';
import { miracles } from './data/miracles';

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

function App() {
  const [value, setValue] = useState('table');
  return (
    <Grommet>
      <Box gap='medium'>
        <Heading>Miracles List</Heading>
        <Data
          data={miracles}
          properties={{
            country: { label: 'Country' }
          }}
        >
          <Toolbar>
            <DataSearch />
            <DataFilters layer />
            <ToggleGroup
              onToggle={e => {
                if (e.value.length) setValue(e.value);
              }}
              value={value}
              options={toggleOptions}
            />
          </Toolbar>
          <DataSummary />
          { value === 'table' && (
            <DataTable
              aria-describedby='eucharistic-miracles-list'
              columns={[
                {
                  property: 'country',
                  header: <Text>Country</Text>,
                },
                {
                  property: 'city',
                  header: <Text>City</Text>,
                },
                {
                  property: 'year',
                  header: <Text>Year</Text>,
                }
              ]}
              verticalAlign={{ body : 'top' }}
              primaryKey={false}
            />
          )}
          { value === 'card' && <CardView /> }
        </Data>
      </Box>
    </Grommet>
  )
}

export default App
