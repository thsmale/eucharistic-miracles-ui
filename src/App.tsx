import {
  Grommet,
} from 'grommet';
import { Outlet, ScrollRestoration } from 'react-router';
import { AppHeader } from './Header';
import { ErrorBoundary } from './ErrorBoundary';

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
  list: {
    item: {
      border: false,
    }
  }
};

function App() {
  return (
    <Grommet full='min' theme={theme}>
      <AppHeader />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <ScrollRestoration
        getKey={(location) => {
          // For home page, return to previous position
          if (location.pathname === '/') {
            return location.pathname;
          }
          // All other pages, i.e miracles, scroll to top
          return location.key;
        }}
      />
    </Grommet>
  )
}

export default App
