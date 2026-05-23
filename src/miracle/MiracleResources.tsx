import {
  Anchor,
  Box,
  Heading,
} from 'grommet';
import { Link } from 'react-router';
import { type Miracle } from '../data/types';

type Props = {
  miracle: Miracle;
}

export const MiracleResources = ({ miracle }: Props) => {
  if (miracle?.resources.length === 0) {
    return null;
  }

  return (
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
                // Odd syntax for typescript
                {...{
                  to: endpoint,
                  state: { path },
                }}
              />
            </li>
          )
        })}
      </ul>
    </Box>
  )
}