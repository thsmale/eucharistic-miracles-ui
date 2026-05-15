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
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters } from './redux/filters';
import { setToggleGroup } from './redux/toggle';
import { setSearchValue } from './redux/search';
import { useDeviceSelectors } from 'react-device-detect';
import { debounce } from 'lodash';

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

export const MiraclesToolbar = ({ setShowLayer }) => {
  const size = useContext(ResponsiveContext);
  const dispatch = useDispatch();
  const selectedCategories = useSelector(state => state.filters.categories); 
  const selectedCountries = useSelector(state => state.filters.countries);
  const selectedToggleGroup = useSelector(state => state.toggleGroup.value)
  const searchValue = useSelector(state => state.search.value)
  const direction = size === 'small' ? 'column' : 'row';
  // Do not show a tool tip on touch screen, other wise tooltip dangles
  // isMobile is true for mobile or tablet
  const [selectors] = useDeviceSelectors(window.navigator.userAgent);
  const { isMobile } = selectors;
  let toggleOptions = originalToggleOptions;
  let numFilters = 0;
  if (selectedCategories.length > 0) numFilters += 1;
  if (selectedCountries.length > 0) numFilters += 1;
  let filterTooltip = numFilters > 0 ? `Open filters, ${numFilters} filters applied` : 'Open filters';
  if (isMobile) {
    toggleOptions = toggleOptions.map(option => ({ ...option, tip: '' }))
    filterTooltip = '';
  }
  // Debounce for a smoother search experience
  const searchInputOnChange = (event) => {
    dispatch(setSearchValue(event.target.value));
  }
  const debounceOnChange = debounce(searchInputOnChange, 250);

  return (
    <Box direction={direction} gap={direction === 'column' ? 'medium' : undefined}>
      <Box width='medium'>
        <TextInput
          icon={<Search />}
          onChange={debounceOnChange}
          placeholder="Search miracles"
          defaultValue={searchValue}
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
                  dispatch(clearFilters());
                }}
              />
            </Box>
          )}
        </Box>
        <ToggleGroup
          onToggle={e => {
            if (e.value.length) {
              dispatch(setToggleGroup(e.value))
            }
          }}
          value={selectedToggleGroup}
          options={toggleOptions}
        />
      </Box>
    </Box>
  )
}