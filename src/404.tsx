import {
  Box,
  Button,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';
import { useNavigate } from 'react-router';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Page background='background-front' kind='narrow'>
      <PageContent pad='medium'>
        <PageHeader
          title="Oops, there's nothing here."
          subtitle="The page you're looking for could not be found."
        />
        <Box flex={false} align='start'>
          <Button
            label="Back to home"
            onClick={() => navigate('/')}
            primary
          />
        </Box>
      </PageContent>
    </Page>
  )
}