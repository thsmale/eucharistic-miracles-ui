import {
  Grommet,
} from 'grommet';
import { Outlet, ScrollRestoration } from 'react-router';
import { AppHeader } from './Header';

const theme = {
  card: {
    hover: {
      container: {
        elevation: 'large',
      },
    },
    container: {
      elevation: 'medium',
      extend: `transition: all 0.2s ease-in-out;`,
    },
  },
};

function App() {
  return (
    <Grommet full='min' theme={theme}>
      <AppHeader />
      <Outlet />
      {<ScrollRestoration />}
    </Grommet>
  )
}

export default App
