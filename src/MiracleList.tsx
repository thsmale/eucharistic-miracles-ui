import { useState } from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataFilter,
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
import { ParentSize } from '@visx/responsive';
import { Hero } from './Hero';
import { CardView } from './CardView';
import { miracles } from './data/miracles';
import WorldMap from './Map';


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

const colorMap = {
  "blood": "#FF9999",        // Light Coral
  "theft": "#8E9AAF",        // Overcast Blue (Dark/shadowy vibe, but safe for black text)
  "doubt": "#D3D3D3",        // Light Gray
  "face": "#FFE4C4",         // Bisque
  "light": "#FFFACD",        // Lemon Chiffon
  "fire": "#FFB347",         // Pastel Vivid Orange
  "preservation": "#C2C5A8", // Muted Green-Grey
  "animals": "#D2B48C",      // Tan
  "science": "#98FB98",      // Pale Green
  "levitation": "#CCEEFF",   // Airy Blue
  "weight": "#A9A9A9",       // Dark Gray
  "sorcery": "#E6E6FA",      // Lavender
  "flesh": "#FFDAB9",        // Peach Puff
  "tissue": "#FFF0F5",       // Lavender Blush
  "flood": "#ADD8E6"         // Light Blue
}

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
                country: { label: 'Country' },
                categories: { label: 'Category' }
              }}
            >
              <Toolbar>
                <DataSearch placeholder="Search miracles" />
                {/*<DataTableGroupBy options={['country']} />*/}
                <DataFilters layer={true}>
                  <DataFilter
                    property="country"
                  />
                  <DataFilter
                    options={Object.getOwnPropertyNames(colorMap)}
                    property="categories"
                  />
                </DataFilters>
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
                    },
                    {
                      property: 'categories',
                      header: <Text>Categories</Text>,
                      render: datum => {
                        if (datum.categories.length > 0) {
                          return (
                            <Box direction="row" gap="xsmall">
                              {datum.categories.map(category => (
                                <Box
                                  background={colorMap[category]}
                                  round='medium'
                                  align='center'
                                  width='xsmall'
                                  key={`${datum.path}-${category}`}
                                >
                                  {category}
                                </Box>
                              ))}
                            </Box>
                          );
                        }
                        return (
                          <Box>--</Box>
                        )
                      }
                    }
                  ]}
                  onClickRow={({ datum }) => {
                    console.log(datum);
                    console.log('click')
                    navigate(`${datum.country}/${datum.city}`, { state: { path: datum.path }})
                  }}
                  primaryKey={'path'}
                  sortable={true}
                  verticalAlign={{ body : 'top' }}
                />
              )}
              { value === 'map' && (
                <Box id='yoooooo' height='xxlarge'>
                  <ParentSize>
                    {({ width, height }) => <WorldMap width={width} height={height} />}
                  </ParentSize>
                </Box>
              )}
              { value === 'card' && <CardView /> }
            </Data>
          </Box>
        </PageContent>
      </Page>
    </Box>
 
  )
}