import {
  Box,
  Heading,
  Page,
  PageContent,
  Text,
} from 'grommet';

export const Hero = () => {
  return (
    <Page flex='grow'
      background={{
        image: `url("/hero.svg")`,
        size: 'cover',
        opacity: .75,
      }}
    >
      <PageContent>
        <Box height={{ 'min': 'medium' }} justify='center'>
          <Box id='carloHero'>
            <Heading level={1} margin='none' size='large' color="#bd1c1d">
              The Eucharistic Miracles of the world
            </Heading>
          </Box>
          <Box>
            <Text size='xxlarge'>An international exhibition created by Carlo Acutis.</Text>
          </Box>
        </Box>
      </PageContent>
    </Page>
  )
}