import { useState } from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  DataTableGroupBy,
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
import { useNavigate } from 'react-router';
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

export const MiracleList = () => {
  const [value, setValue] = useState('table');
  const navigate = useNavigate();

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
                  onClickRow={({ datum }) => {
                    console.log(datum);
                    console.log('click')
                    navigate(`${datum.country}/${datum.city}`)
                  }}
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
    </Box>
 
  )
}