import { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import {
  Anchor,
  Box,
  Button,
  Carousel,
  Footer,
  Heading,
  Image,
  Notification,
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
import parse, { domToReact } from 'html-react-parser';
import { isEmpty } from 'lodash';
import { NotFound } from './404';
import { getMiracle, getPath } from './data/miracles';

const cdnUrl = import.meta.env.VITE_API_CDN_URL;



export const Miracle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { country, city, year } = useParams();
  const [miracle, setMiracle] = useState(null);
  const [loading, setLoading] = useState(true);
  // 0 no error, 1: 404 not found, 2: error loading data
  const [errorType, setErrorType] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /**
         * location.state.path will exist as it is received from navigate like onClick from DataTable, MapMarker, or Card
         * if a user just types in a url like a/b/c we will try to find the path based off the country, city provided
         */
        const path = location?.state?.path || getPath(country, city, year);
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
  }, [country, city, year, location?.state?.path])

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

  /**
   * intro, overview, captions are expected to contain html
   * we will use this to convert some html to Grommet
   */
  const htmlToReactOptions = {
    replace(domNode) {
    /**
     * <p> check is recursive
     * since it can have a or img child elements
     */
      if (domNode.name === 'p') {
        return (
          <Paragraph margin='none' fill={true}>
            {domToReact(domNode.children, htmlToReactOptions)}
          </Paragraph>
        )
      }
      /**
     * expecting a href value set to the path of the filename
     * will use that to get the miracle details
     * which can be used to properly set the href and navigate
     */
      if (domNode.name === 'a') {
        const path = domNode.attribs.href;
        const { country, city, year } = getMiracle(path);
        const endpoint = `/${country}/${city}/${year}`;
        return (
          <Anchor
            href={endpoint}
            label={domNode.children[0].data}
            onClick={() => {
              navigate(endpoint, { state: { path }})
            }}
          />
        )
      }
      // This is only used for the QR code in Buenos Aires 1996 (part 3)
      if (domNode.name === 'img') {
        const attribs = domNode.attribs;
        const src = attribs.src;
        const alt = attribs.alt;
        return (
          <Image
            alt={alt}
            fit="contain"
            src={`${cdnUrl}/images/${src}`}
          />
        )
      }
    }
  }

  const tweetContent = [
    `Check out the ${miracle?.title} ${miracle?.city}, ${miracle?.country} ${miracle?.year}.`,
    window.location.href
  ].join('%0A%0A')

  // Notifications are to let users know if there is any missing context, like a part 1
  let notificationActions = [];
  let hasNotification = false;
  if (!isEmpty(miracle.notification)) {
    hasNotification = true;
    miracle.notification.actions.map(action => {
      const { country, city, year } = getMiracle(action.path);
      const endpoint = `/${country}/${city}/${year}`;
      const modifiedAction = {
        label: action.label,
        href: endpoint,
        onClick: () => navigate(endpoint, { state: { path: action.path }})
      }
      notificationActions = [...notificationActions, modifiedAction]
    })
  }

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
            {hasNotification && showNotification && (
              <Box margin={{ bottom: 'medium' }}>
                <Notification
                  status="info"
                  title={miracle.notification.title}
                  message={miracle.notification.message}
                  actions={notificationActions}
                  onClose={() => setShowNotification(false)}
                />
              </Box>
            )}
            <Heading margin='none' level={3}>Introduction</Heading>
            {parse(miracle?.intro, htmlToReactOptions)}
          </Box>
          <Box>
            <Heading margin='none' level={3}>Overview</Heading>
            {parse(miracle?.overview, htmlToReactOptions)}
          </Box>
          {miracle?.images.length > 0 && (
            <Box>
              <Heading margin='none' level={3}>Images</Heading>
              <Box width="medium" height="medium" overflow="hidden">
                <Carousel fill controls="arrows">
                  {miracle.images.map(img => (
                    <Box key={img.path} width="medium" height="medium">
                      <Image
                        fallback="/picture-failed-to-load.svg"
                        fit="cover"
                        src={`${cdnUrl}/images/${img.path}`}
                      />
                      <Text size="small">{parse(img.caption)}</Text>
                    </Box>
                  ))}
                </Carousel>
              </Box>
            </Box>
          )}
          {miracle?.resources.length > 0 && (
            <Box>
              <Heading margin='none' level={3}>Resources</Heading>
              <ul style={{ marginTop: 0, marginBottom: 0 }}>
                {miracle?.resources.map(resource => {
                  const { country, city, year } = getMiracle(resource.path);
                  const endpoint = `/${country}/${city}/${year}`;
                  return (
                    <li key={resource.path}>
                      <Anchor
                        href={endpoint}
                        label={resource.label}
                        onClick={() => {
                          navigate(endpoint, { state: { path: resource.path }})
                        }}
                      />
                    </li>
                  )
                })}
              </ul>
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