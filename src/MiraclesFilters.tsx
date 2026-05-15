import React, { useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from './redux/filters';
import { colorMap, miracles } from './data/miracles';

const uniqueCountries = Array.from(new Set(miracles.map(({ country }) => country)));

export const MiraclesFilters = ({ setShowLayer }) => {
  // Use to maintain local state since filters are only applied when submit is pressed
  const selectedCategories = useSelector(state => state.filters.categories); 
  const selectedCountries = useSelector(state => state.filters.countries); 
  const [localFilters, setLocalFilters] = useState({
    categories: selectedCategories,
    countries: selectedCountries,
  });
  const dispatch = useDispatch();

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
                options={uniqueCountries}
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