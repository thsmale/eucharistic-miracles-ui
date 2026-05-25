import {
  Box,
  Button,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';

interface Props { 
  title?: string,
  subtitle?: string,
}

export const ErrorOccurred = ({ title="", subtitle="" }: Props) => {
  const displayTitle = title || "An unknown error occurred."
  const displaySubtitle = subtitle || "Sorry about that, please try again."

  return (
    <Page background='background-front' kind='narrow'>
      <PageContent>
        <PageHeader
          title={displayTitle}
          subtitle={displaySubtitle}
        />
        <Box flex={false} align='start' pad={{ bottom: 'medium' }}>
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