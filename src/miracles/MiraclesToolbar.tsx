import {
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import {
  Box,
  Button,
  DropButton,
  Form,
  FormField,
  RadioButtonGroup,
  ResponsiveContext,
  Select,
  Stack,
  Text,
  TextInput,
  ToggleGroup,
} from 'grommet';
import {
  AppsRounded,
  Descend,
  Filter,
  Map,
  Search,
  Table,
} from 'grommet-icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearFilters } from '../redux/filters';
import { setToggleGroup, type allowedToggleValues } from '../redux/toggle';
import { setSort } from '../redux/sort';
import { setSearchValue } from '../redux/search';
import { useDeviceSelectors } from 'react-device-detect';
import { debounce } from 'lodash';

interface ToggleOption {
  icon: ReactNode,
  value:  allowedToggleValues,
  tip: string,
}

const originalToggleOptions: ToggleOption[] = [
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

type Props = {
  setShowLayer: Dispatch<SetStateAction<boolean>>
}

export const MiraclesToolbar = ({ setShowLayer }: Props) => {
  const size = useContext(ResponsiveContext);
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(state => state.filters.categories); 
  const selectedCountries = useAppSelector(state => state.filters.countries);
  const selectedToggleGroup = useAppSelector(state => state.toggleGroup.value)
  const searchValue = useAppSelector(state => state.search.value)
  const sortValue = useAppSelector(state => state.sort);
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
  const searchInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          type="search"
        />
      </Box>
      <Box direction='row'>
        <Box direction='row' align='center' margin={{ bottom: size === 'small' ? 'large': undefined }}>
          <DropButton
            dropContent={
              <Box pad='small'>
                <Form
                  value={sortValue}
                  onChange={(value) => {
                    dispatch(setSort(value))
                  }}
                >
                  <FormField
                    label='Sort by'
                    name='property'
                    htmlFor='property'
                  >
                    <Select
                      options={['Country', 'City', 'Year', 'Categories']}
                      id='property'
                      name='property'
                    />
                  </FormField>
                  <FormField
                    label='Sort direction'
                    name='direction'
                    htmlFor='direction'
                  >
                    <RadioButtonGroup
                      id='direction'
                      name='direction'
                      options={['Ascending', 'Descending']}
                    />
                  </FormField>
                </Form>
              </Box>
            }
            dropProps={{ align: { top: 'bottom', left: 'left' }}}
            icon={<Descend />}
            tip="Open sort"
          />
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
          onToggle={({ value }) => {
            if (value === undefined || Array.isArray(value)) {
              console.warn('Received invalid type for toggle')
              return;
            }
            dispatch(setToggleGroup(value as allowedToggleValues))
          }}
          value={selectedToggleGroup}
          options={toggleOptions}
        />
      </Box>
    </Box>
  )
}