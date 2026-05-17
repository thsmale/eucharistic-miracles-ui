import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
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
  Link as LinkIcon,
  LinkPrevious,
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
  const [miracle, setMiracle] = useState(null);
  const [loading, setLoading] = useState(true);
  // 0 no error, 1: 404 not found, 2: error loading data
  const [errorType, setErrorType] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

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
     * expecting a href value set to the UI endpoint
     * will use that to get the miracle details
     * which will be used to get the miracle details path
     */
      if (domNode.name === 'a') {
        const endpoint = domNode.attribs.href;
        const { path } = getMiracle(endpoint);
        return (
          <Anchor
            as={Link}
            label={domNode.children[0].data}
            state={{ path }}
            to={endpoint}
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
      const { endpoint, label, path } = action;
      const modifiedAction = {
        label,
        href: endpoint,
        onClick: (event) => {
          // Cannot pass react-router Link, state, to here
          // ...due to issue with Grommet
          event?.preventDefault();
          navigate(endpoint, { state: { path }})
        }
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
                    icon={<LinkIcon />}
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
              <Box>
                <Carousel
                  activeChild={activeImage}
                  controls="arrows"
                  height='medium'
                  onChild={setActiveImage}
                  width='medium'
                >
                  {miracle.images.map(img => (
                    <Box
                      key={img.path}
                      width="medium"
                      height="medium"
                      background='background-front'
                      overflow="hidden"
                    >
                      <Image
                        className="blur-bg"
                        fallback="/picture-failed-to-load.svg"
                        fit="cover"
                        src={`${cdnUrl}/images/${img.path}`}
                      />
                      <Image
                        className="image-bg"
                        fallback="/picture-failed-to-load.svg"
                        fit="cover"
                        src={`${cdnUrl}/images/${img.path}`}
                      />
                    </Box>
                  ))}
                </Carousel>
                <Box width='medium'>
                  <Paragraph fill>{parse(miracle.images[activeImage].caption)}</Paragraph>
                </Box>
              </Box>
            </Box>
          )}
          {miracle?.resources.length > 0 && (
            <Box>
              <Heading margin='none' level={3}>Resources</Heading>
              <ul style={{ marginTop: 0, marginBottom: 0 }}>
                {miracle?.resources.map(resource => {
                  const { endpoint, path, label } = resource;
                  return (
                    <li key={path}>
                      <Anchor
                        as={Link}
                        label={label}
                        to={endpoint}
                        state={{ path }}
                      />
                    </li>
                  )
                })}
              </ul>
            </Box>
          )}
        </PageContent>
      </Page>
      <Box gap='medium'>
        <Footer pad={{ left: 'medium' }}>
          <Button
            color='transparent'
            hoverIndicator={true}
            icon={<LinkPrevious />}
            label="Go to miracle list"
            onClick={() => navigate('/')}
          />
        </Footer>
        <Footer border={{ side: 'top' }} pad='medium'>
          <Text size='small'>{miracle.copyright}</Text>
        </Footer>
      </Box>
    </Box>
  )
}