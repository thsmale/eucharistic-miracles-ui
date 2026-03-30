import { useState } from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  DataTableGroupBy,
  Grommet,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  Text,
  ToggleGroup,
  Toolbar,
} from 'grommet';
import {
  AppsRounded,
  Map,
  Table,
} from 'grommet-icons';
import { AppHeader } from './Header';
import { Hero } from './Hero';
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
    <Grommet full='min'>
      <AppHeader />
      <Hero />
      <Page background='background-back'>
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
              data={miracles}
              properties={{
                country: { label: 'Country' }
              }}
            >
              <Toolbar>
                <DataSearch />
                <DataTableGroupBy options={['country']} />
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
                  onClickRow={() => console.log('click')}
                  primaryKey={false}
                  sortable={true}
                  verticalAlign={{ body : 'top' }}
                />
              )}
              { value === 'card' && <CardView /> }
            </Data>
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  )
}

export default App
