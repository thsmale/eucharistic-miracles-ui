import { useContext } from 'react';
import {
  Box,
  Heading,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
} from 'grommet';

export const Hero = () => {
  const size = useContext(ResponsiveContext);
  let ellipse = '10%';

  if (size === 'small' || size === 'medium') {
    ellipse = '50%';
  }

  return (
    <Page flex='grow'
      background={
        `
          radial-gradient(ellipse ${ellipse} 100% at bottom left, #b3e7fe, transparent),
          radial-gradient(ellipse ${ellipse} 100% at top right, #e7b7b7, transparent),
          linear-gradient(to bottom right, #f8fafc, #eff6ff, #f1f5f9);
          `
      }
    >
      <PageContent>
        <Box height={{ 'min': 'medium' }} justify='center'>
          <Box id='carloHero'>
            <Heading level={1} margin='none'>
                The Eucharistic Miracles of the world
            </Heading>
          </Box>
          <Box>
            <Text size='xlarge'>An international exhibition created by Carlo Acutis.</Text>
          </Box>
        </Box>
      </PageContent>
    </Page>
  )
}