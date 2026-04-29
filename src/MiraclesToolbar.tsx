import {
  Box,
  Button,
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

const searchKeys = ['country', 'city', 'year', 'categories'];

export const MiraclesToolbar = ({ defaultFilters, numFilters, setFilters, setNumFilters, setSearchInput, setShowLayer, setToggleGroupValue, toggleGroupValue }) => {

  return (
    <Box direction='row'>
      <Box width='medium'>
        <TextInput
          icon={<Search />}
          onChange={event => {
            setSearchInput(event.target.value);
          }}
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
              }}
            />
          </Box>
        )}
      </Box>
      <ToggleGroup
        onToggle={e => {
          if (e.value.length) setToggleGroupValue(e.value);
        }}
        value={toggleGroupValue}
        options={toggleOptions}
      />
    </Box>
  )
}