import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import {
  Box,
  Button,
  Carousel,
  Footer,
  Heading,
  Image,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  Spinner,
  Text,
} from 'grommet';
import {
  DocumentPdf,
  Facebook,
  Link,
  X,
} from 'grommet-icons';
import parse from 'html-react-parser';
import { NotFound } from './404';
import { getPath } from './data/miracles';

const cdnUrl = import.meta.env.VITE_API_CDN_URL;

export const Miracle = () => {
  const { country, city } = useParams();
  const location = useLocation();
  const [miracle, setMiracle] = useState(null);
  const [loading, setLoading] = useState(true);
  // 0 no error, 1: 404 not found, 2: error loading data
  const [errorType, setErrorType] = useState(0);

  useEffect(() => {
    /**
     * location.state.path will exist as it is received from navigate like onClick from DataTable, MapMarker, or Card
     * if a user just types in a url like a/b we will try to find the path based off the country, city provided
     */
    const path = location?.state?.path || getPath(country, city);
    const fetchData = async () => {
      try {
        const response = await fetch(`${cdnUrl}/json/${path}`);
        if (response.status === 404) {
          console.log(`Received 404 when fetching miracle ${path}`)
          setErrorType(1);
          return;
        }
        if (response.status < 200 || response.status >= 300) {
          console.log(`Received non 2xx ${response.status} when fetching miracle ${path}`)
          setErrorType(2);
          return;
        }
        const result = await response.json();
        setMiracle(result);
      } catch (err) {
        console.error(`Error fetching ${err}`);
        setErrorType(2);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [country, city, location?.state?.path])

  if (loading) {
    return (
      <Box
        align='center'
        justify='center'
        margin={{ top: '25%' }}
        width="100%"
      >
        <Spinner
          message={{
            start: 'Loading data.',
            end: 'Data has been loaded.'
          }}
        />
      </Box>
    )
  }


  if (errorType === 1) {
    return <NotFound />
  }

  if (miracle === null || errorType !== 0) {
    return (
      <Page background='background-front' kind='narrow'>
        <PageContent pad='medium'>
          <PageHeader
            title="An error occurred."
            subtitle="Unable to load the Eucharistic miracle."
          />
          <Box flex={false} align='start'>
            <Button
              href={window.location.href}
              label="Refresh page"
              primary
            />
          </Box>
        </PageContent>
      </Page>
    );
  }

  const tweetContent = [
    `Check out the ${miracle?.title} ${miracle?.city}, ${miracle?.country} ${miracle?.year}.`,
    window.location.href
  ].join('%0A%0A')

  return (
    <Box>
      <Page background='background-front' kind='narrow' pad={{ bottom: 'xlarge' }}>
        <PageContent gap='medium'>
          <PageHeader
            title={`${miracle?.title} ${miracle?.city}`}
            subtitle={(
              <Box gap='small'>
                <Text>
                  {miracle?.country} {miracle.year}
                </Text>
                <Box direction='row' gap='xsmall'>
                  <Button
                    hoverIndicator
                    icon={<X />}
                    href={`https://twitter.com/intent/tweet?text=${tweetContent}`}
                    target="_blank"
                  />
                  <Button
                    hoverIndicator
                    icon={<Facebook />}
                    href={`http://www.facebook.com/sharer.php?u=${window.location.href}`}
                    target="_blank"
                  />
                  <Button
                    hoverIndicator
                    icon={<Link />}
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                  />
                  <Button
                    hoverIndicator
                    icon={<DocumentPdf />}
                    href={miracle.pdfLink}
                    target="_blank"
                  />
                </Box>
              </Box>
            )}
          />
          <Box>
            <Heading margin='none' level={3}>Introduction</Heading>
            <Paragraph margin='none' fill={true}>{miracle?.intro}</Paragraph>
          </Box>
          <Box>
            <Heading margin='none' level={3}>Overview</Heading>
            <Paragraph margin='none' fill={true}>
              {parse(miracle?.overview)}
            </Paragraph>
          </Box>
          {miracle?.images.length > 0 && (
            <Box>
              <Heading margin='none' level={3}>Images</Heading>
              <Box width="medium" height="medium" overflow="hidden">
                <Carousel fill controls="arrows">
                  {miracle.images.map(img => (
                    <Box key={img.path} width="medium" height="medium">
                      <Image fit="cover" src={`/images/${img.path}`} />
                      <Text size="small">{parse(img.caption)}</Text>
                    </Box>
                  ))}
                </Carousel>
              </Box>
            </Box>
          )}
        </PageContent>
      </Page>
      <Footer border={{ side: 'top' }} pad='medium'>
        <Text size='small'>{miracle.copyright}</Text>
      </Footer>
    </Box>
  )
}