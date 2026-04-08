import {
  Anchor,
  Box,
  Cards,
  Card as GrommetCard,
  CardBody,
  Text,
  Heading,
} from 'grommet';
import { Location, Calendar } from "grommet-icons";
import { useNavigate } from 'react-router';

export const CardView = () => {
  return (
    <Cards size='medium' margin={{ bottom: 'medium' }}>
      {datum => (
        <Card
          key={datum.country}
          country={datum.country}
          city={datum.city}
          year={datum.year}
          path={datum.path}
        />
      )}
    </Cards>
  )
}

const Card = ({ country, city, year, path }) => {
  const navigate = useNavigate();

  return (
    <GrommetCard elevation='medium'>
      <CardBody gap='medium' pad='medium'>
        <Box gap='3xsmall'>
          <Heading level={2} margin='none'>
            {country}
          </Heading>
          <Box direction="column">
            <Box direction="row" align="center" gap="xsmall">
              <Location/>
              <Text>{city}</Text>
            </Box>
            <Box direction="row" align="center" gap="xsmall">
              <Calendar />
              <Text>{year}</Text>
            </Box>
          </Box>
        </Box>
        <Anchor
          label='View details'
          onClick={() => navigate(`${country}/${city}`, { state: { path: path }})}
        />
      </CardBody>
    </GrommetCard>
  )
}