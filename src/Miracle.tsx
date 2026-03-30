import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Box,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
} from 'grommet';

export const Miracle = () => {
  const { country, city } = useParams();
  const [miracle, setMiracle] = useState(null);

  useEffect(() => {
    console.log(`fetch content for country: ${country} and city ${city}`)
    const fetchData = async () => {
      try {
        const response = await fetch('/austria/Fiecht.json');
        const result = await response.json();
        console.log(result);
        setMiracle(result);
      } catch (err) {
        console.error(`Error fetching ${err}`);
      }
    }
    fetchData();
  }, [country, city])


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
          <Paragraph margin='none' fill={true}>{miracle?.overview}</Paragraph>
        </Box>
        <Box>
          <Heading margin='none' level={3}>Images</Heading>
          <Paragraph margin='none'>{miracle?.images.map(img => img.caption).join(', ')}</Paragraph>
        </Box>
      </PageContent>
    </Page>
  )
}