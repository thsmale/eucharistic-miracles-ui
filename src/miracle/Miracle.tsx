import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
  Box,
  Heading,
  Page,
  PageContent,
  Spinner,
} from 'grommet';
import parse from 'html-react-parser';
import { NotFound } from '../404';
import { ErrorOccurred } from '../Erorr';
import { getPath } from '../data/miracles';
import { type Miracle as MiracleType } from '../data/types';
import { MiracleHeader } from './MiracleHeader';
import { MiracleNotification } from './MiracleNotification';
import { MiracleImages } from './MiracleImages';
import { MiracleResources } from './MiracleResources';
import { MiracleFooter } from './MiracleFooter';
import { htmlToReactOptions } from './htmlToReactOptions';

const cdnUrl = import.meta.env.VITE_API_CDN_URL;

export const Miracle = () => {
  const location = useLocation();
  const [miracle, setMiracle] = useState<MiracleType | null>(null);
  const [loading, setLoading] = useState(true);
  // 0 no error, 1: 404 not found, 2: error loading data
  const [errorType, setErrorType] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /**
         * location.state.path will exist as it is received from navigate like onClick from DataTable, MapMarker, or Card
         * it is recommended to pass location.state.path to avoid the getPath lookup
         * if a user just types in a url like a/b/c we will try to find the path based off the country, city, year provided
         */
        const path = location.state?.path || getPath(location.pathname);
        const response = await fetch(`${cdnUrl}/json/${path}`);
        if (response.status === 404) {
          console.error(`Received 404 when fetching miracle ${path}`)
          setErrorType(1);
          return;
        }
        if (response.status < 200 || response.status >= 300) {
          console.error(`Received non 2xx ${response.status} when fetching miracle ${path}`)
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
  }, [location])

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
      <ErrorOccurred
        title="An error occurred."
        subtitle="Unable to load the Eucharistic miracle."
      />
    );
  }

  return (
    <Box>
      <Page background='background-front' kind='narrow' pad={{ bottom: 'xlarge' }}>
        <PageContent gap='medium'>
          <MiracleHeader miracle={miracle} />
          <Box>
            <MiracleNotification miracle={miracle} />
            <Heading margin='none' level={3}>Introduction</Heading>
            {parse(miracle?.intro, htmlToReactOptions)}
          </Box>
          <Box>
            <Heading margin='none' level={3}>Overview</Heading>
            {parse(miracle?.overview, htmlToReactOptions)}
          </Box>
          <MiracleImages miracle={miracle} />
          <MiracleResources miracle={miracle} />
        </PageContent>
      </Page>
      <MiracleFooter miracle={miracle}/>
    </Box>
  )
}