import {
  Anchor,
  Box,
  Button,
  Cards,
  Card as GrommetCard,
  CardBody,
  CardFooter,
  CardHeader,
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
          key={datum.path}
          country={datum.country}
          city={datum.city}
          year={datum.year}
          path={datum.path}
        />
      )}
    </Cards>
  )
}

const Eucharist = () => {
  return (
    <Box pad={{ bottom: 'xsmall' }}>
      <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="black"/>

        <g fill="white">
          <path d="M 29 12 H 35 
                  C 37 12 37 14.5 35 14.5
                  L 33 50
                  C 33 52 31 52 31 50
                  L 29 14.5
                  C 27 14.5 27 12 29 12 Z" />
          
          <path d="M 10 30 V 34
                  C 10 36.5 12.5 36.5 12.5 34
                  L 29 33
                  C 31 33 31 31 29 31
                  L 12.5 30
                  C 12.5 27.5 10 27.5 10 30 Z" />

          <path d="M 54 30 V 34
                  C 54 36.5 51.5 36.5 51.5 34
                  L 35 33
                  C 33 33 33 31 35 31
                  L 51.5 30
                  C 51.5 27.5 54 27.5 54 30 Z" />
        </g>
      </svg>
    </Box>
  )
}

const Card = ({ country, city, year, path, }) => {
  const navigate = useNavigate();
  const padSize = { horizontal: "medium", vertical: "small" };

  return (
    <GrommetCard
      elevation='medium'
      onClick={() => navigate(`${country}/${city}`, { state: { path: path }})}
    >
      <CardHeader
        direction="column"
        gap="none"
        align="start"
        pad={padSize}
      >
        <Eucharist />
        <Heading level={2} margin='none'>
          {country}
        </Heading>
      </CardHeader>
      <CardBody align="start" pad={{ top: 'none', bottom: 'medium', ...padSize}}>
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
      </CardBody>
      <CardFooter
        align="stretch"
        direction="column"
        gap="xsmall"
        pad={padSize}
      >
        <Box flex={false} align="start">
          <Button
            label='View details'
            onClick={(event) => {
              event?.stopPropagation();
              navigate(`${country}/${city}`, { state: { path: path }})
            }}
            secondary
          />
        </Box>
      </CardFooter>
    </GrommetCard>
  )
}