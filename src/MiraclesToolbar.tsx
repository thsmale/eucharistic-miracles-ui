import { useContext } from 'react';
import {
  Box,
  Button,
  ResponsiveContext,
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
import { useDeviceSelectors } from 'react-device-detect';

const originalToggleOptions = [
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

export const MiraclesToolbar = ({
  defaultFilters,
  numFilters,
  setFilters,
  setNumFilters,
  setSearchInput,
  setShowLayer,
  setToggleGroupValue,
  toggleGroupValue
}) => {
  const size = useContext(ResponsiveContext);
  const direction = size === 'small' ? 'column' : 'row';
  // Do not show a tool tip on touch screen, other wise tooltip dangles
  // isMobile is true for mobile or tablet
  const [selectors] = useDeviceSelectors(window.navigator.userAgent);
  const { isMobile } = selectors;
  let toggleOptions = originalToggleOptions;
  let filterTooltip = numFilters > 0 ? `Open filters, ${numFilters} filters applied` : 'Open filters';
  if (isMobile) {
    toggleOptions = toggleOptions.map(option => ({ ...option, tip: '' }))
    filterTooltip = '';
  }

  return (
    <Box direction={direction} gap={direction === 'column' ? 'medium' : undefined}>
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
        <Box direction='row' align='center' margin={{ bottom: size === 'small' ? 'large': undefined }}>
          <Stack anchor='top-right'>
            <Button
              icon={<Filter />}
              onClick={() => setShowLayer(true)}
              tip={filterTooltip}
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
            <Box pad={{ horizontal: size === 'small' ? 'small' : 'xsmall' }}>
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
    </Box>
  )
}