import {
  Anchor,
  Box,
  Cards,
  Card as GrommetCard,
  CardBody,
  Text,
  Heading,
} from 'grommet';

export const CardView = () => {
  return (
    <Cards size='medium' margin={{ bottom: 'medium' }}>
      {datum => (
        <Card
          key={datum.country}
          country={datum.country}
          description='Lorem Ipsum'
          src='http://localhost'
        />
      )}
    </Cards>
  )
}

const Card = ({ country, description, src }) => {
  return (
    <GrommetCard elevation='medium'>
      <CardBody gap='medium'>
        <Box gap='3xsmall'>
          <Heading level={2} margin='none'>
            {country}
          </Heading>
          <Text>{description}</Text>
        </Box>
        <Anchor label='View details' />
      </CardBody>
    </GrommetCard>
  )
}