import {
  Box,
  Button,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';

export const NotFound = () => {
  return (
    <Page background='background-front' kind='narrow'>
      <PageContent pad='medium'>
        <PageHeader
          title="Oops, there's nothing here."
          subtitle="The page you're looking for could not be found."
        />
        <Box flex={false} align='start'>
          <Button
            href="/"
            label="Back to home"
            primary
          />
        </Box>
      </PageContent>
    </Page>
  )
}