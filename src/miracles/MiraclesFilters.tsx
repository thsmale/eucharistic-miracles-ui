import {
  useState,
  type Dispatch,
  type SetStateAction
} from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  SelectMultiple,
} from 'grommet';
import { Close } from 'grommet-icons';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setFilters } from '../redux/filters';
import { miracles } from '../data/miraclesMetadata';
import { colorMap } from '../data/utils';

type Props = {
  setShowLayer: Dispatch<SetStateAction<boolean>>
}

/**
 * One miracle has two countries, Netherlands-Spain
 * I don't want users to be able to filter by Netherlands-Spain
 * They can sort either by Spain or Netherlands
 */
const countriesSet = new Set(miracles.map(({ country }) => country))
countriesSet.delete('Netherlands-Spain')
const uniqueCountries = Array.from(countriesSet);

export const MiraclesFilters = ({ setShowLayer }: Props) => {
  const dispatch = useAppDispatch();
  // Use to maintain local state since filters are only applied when submit is pressed
  const selectedCategories = useAppSelector(state => state.filters.categories); 
  const selectedCountries = useAppSelector(state => state.filters.countries); 
  const [localFilters, setLocalFilters] = useState({
    categories: selectedCategories,
    countries: selectedCountries,
  });
  const [countryOptions, setCountryOptions] = useState(uniqueCountries);

  return (
    <Layer
      position='right'
      full='vertical'
      onClickOutside={() => setShowLayer(false)}
    >
      <Box pad='medium' gap='medium' overflow='auto'>
        <Header flex={false} align='start' gap='xsmall' justify='between'>
          <Heading level={2} margin='none'>
            Filters
          </Heading>
          <Button
            a11yTitle='Close modal'
            icon={<Close />}
            onClick={() => setShowLayer(false)}
          />
        </Header>
        <Box flex={false}>
          <Form
            value={localFilters}
            onChange={(value) => {
              setLocalFilters(value)
            }}
            onSubmit={({ value }) => {
              dispatch(setFilters(value))
              setShowLayer(false);
            }}
          >
            <FormField
              label='Country'
              name='countries'
              htmlFor='countries'
            >
              <SelectMultiple
                id='countries'
                name='countries'
                options={countryOptions}
                onClose={() => setCountryOptions(uniqueCountries)}
                onSearch={(text) => {
                  // The line below escapes regular expression special characters:
                  // [ \ ^ $ . | ? * + ( )
                  const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

                  // Create the regular expression with modified value which
                  // handles escaping special characters. Without escaping special
                  // characters, errors will appear in the console
                  const exp = new RegExp(escapedText, 'i');
                  setCountryOptions(uniqueCountries.filter((o) => exp.test(o)));
                }}
                placeholder="Select countries"
              />
            </FormField>
            <FormField
              label='Category'
              name='categories'
              htmlFor='categories'
            >
              <SelectMultiple
                id='categories'
                name='categories'
                options={Object.getOwnPropertyNames(colorMap)}
                placeholder="Select categories"
              />
            </FormField>
            <Box flex={false} align='start' pad={{ top: 'medium' }}>
              <Button
                label='Apply filters'
                primary
                type="submit"
              />
            </Box>
          </Form>
        </Box>
      </Box>
    </Layer>
  )
}