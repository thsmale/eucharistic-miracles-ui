import {
  Box,
  Button,
  Footer,
  Text,
} from 'grommet';
import { useNavigate } from 'react-router';
import { LinkPrevious } from 'grommet-icons';
import { type Miracle } from '../data/types';

type Props = {
  miracle: Miracle;
}

export const MiracleFooter = ({ miracle }: Props) => {
  const navigate = useNavigate();

  return (
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
  )
}