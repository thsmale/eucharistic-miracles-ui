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
      background='background-back'
    >
      <Button href='/'>
        <Box
          direction='row'
          align='center'
          gap='xsmall'
          pad={{ vertical: '3xsmall' }}
          responsive={false}
        >
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="black">
              <path d="M 16 22 C 16 38 48 38 48 22 Z" />
              <circle cx="32" cy="42" r="4" />
              <path d="M 28 50 Q 32 34 36 50 Z" />
              <ellipse cx="32" cy="52" rx="20" ry="4" />
            </g>
            <g>
              <circle cx="32" cy="26" r="14" fill="white" stroke="black" strokeWidth="2" />
              <path d="M 32 16 V 36 M 22 26 H 42" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
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