import {
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
import { miraclesMetadataLength } from '../data/utils';
import { type MiracleMetadata } from '../data/types';

export const MiraclesCards = () => {
  return (
    <Cards
      margin={{ bottom: 'medium' }}
      size='medium'
      step={miraclesMetadataLength}
    >
      {datum => (
        <Card
          key={datum.path}
          miracle={datum}
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
          <path d="M 28 8 H 36 V 56 H 28 Z" />
          <path d="M 24 8 H 40 V 12 H 24 Z" /> <path d="M 24 52 H 40 V 56 H 24 Z" /> <path d="M 8 28 V 36 H 56 V 28 Z" />
          <path d="M 8 24 V 40 H 12 V 24 Z" /> <path d="M 52 24 V 40 H 56 V 24 Z" /> </g>
      </svg>
    </Box>
  )
}

type Props = {
  miracle: MiracleMetadata
}

const Card = ({ miracle }: Props) => {
  const navigate = useNavigate();
  const { country, city, endpoint, path, year } = miracle;
  const padSize = { horizontal: "medium", vertical: "small" };

  return (
    <GrommetCard
      elevation='medium'
      onClick={() => navigate(`${endpoint}`, { state: { path }})}
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
            secondary
          />
        </Box>
      </CardFooter>
    </GrommetCard>
  )
}