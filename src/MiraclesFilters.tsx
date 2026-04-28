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
import { colorMap, miracles } from './data/miracles';

const countries = Array.from(new Set(miracles.map(({ country }) => country)));

export const MiraclesFilters = ({ setShowLayer }) => {
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
            //onClick={setShowLayer(false)}
          />
        </Header>
        <Box flex={false}>
          <Form>
            <FormField
              label='Country'
              name='country'
              htmlFor='country'
            >
              <SelectMultiple
                id='country'
                name='country'
                onChange={({ value, option }) => {
                  console.log(value, option);
                }}
                options={countries}
                placeholder="Select countries"
              />
            </FormField>
            <FormField
              label='Category'
              name='category'
              htmlFor='category'
            >
              <SelectMultiple
                id='country'
                name='country'
                options={Object.getOwnPropertyNames(colorMap)}
                placeholder="Select categories"
              />
            </FormField>
          </Form>
        </Box>
        <Box flex={false} align='start'>
          <Button
            label='Apply filters'
            primary
          />
        </Box>
      </Box>
    </Layer>
  )
}