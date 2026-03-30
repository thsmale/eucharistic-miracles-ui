import {
  Box,
  Button,
  Header,
  Text,
} from 'grommet';

export const AppHeader = () => {
  return (
    <Header
      fill='horizontal'
      pad={{ horizontal: 'medium', vertical: 'medium' }}
      border={{ side: 'bottom' }}
    >
      <Button>
        <Box
          direction='row'
          align='start'
          gap='medium'
          pad={{ vertical: '3xsmall' }}
          responsive={false}
        >
          <Box direction='row' gap='xsmall' wrap>
            <Text color='text-strong' weight='bold'>
                            Carlo Acutis
            </Text>
            <Text color='text-strong'>Miracles List</Text>
          </Box>
        </Box>
      </Button>
    </Header>
  )
}