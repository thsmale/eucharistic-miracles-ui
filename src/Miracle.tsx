import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import {
  Box,
  Heading,
  Image,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  Text,
} from 'grommet';
import parse from 'html-react-parser';

export const Miracle = () => {
  const { country, city } = useParams();
  const location = useLocation();
  const [miracle, setMiracle] = useState(null);

  useEffect(() => {
    console.log(`fetch content for country: ${country} and city ${city} at ${location?.state?.path}`)
    const fetchData = async () => {
      try {
        const response = await fetch(`/${location.state.path}`);
        const result = await response.json();
        console.log(result);
        setMiracle(result);
      } catch (err) {
        console.error(`Error fetching ${err}`);
      }
    }
    fetchData();
  }, [country, city, location])


  if (miracle === null) {
    return (
      <p>oops no data found!</p>
    )
  }

  return (
    <Page background='background-front' kind='narrow'>
      <PageContent gap='medium'>
        <PageHeader
          title={`${miracle?.title} ${miracle?.city}`}
          subtitle={`${miracle?.country} ${miracle.year}`}
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
            <Box gap='small'>
              {miracle.images.map(img => (
                <Box>
                  <Image fit="contain" src={`/images/${img.path}`} />
                  <Text size="small">{img.caption}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </PageContent>
    </Page>
  )
}