import { useEffect } from 'react';
import {
  Box,
  Grommet,
} from 'grommet';
import { Outlet, ScrollRestoration } from 'react-router';
import { useDeviceSelectors } from 'react-device-detect';
import { DeviceContext } from './data/utils';
import { AppHeader } from './Header';
import { ErrorBoundary } from './ErrorBoundary';
import { useAppDispatch } from './redux/hooks';
import { setToggleGroup } from './redux/toggle';

const theme = {
  global: {
    font: {
      family: '"EB Garamound", serif',
    },
  },
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
  heading: {
    font: {
      family: 'Lora, serif'
    }
  },  
  list: {
    item: {
      border: false,
    }
  },
  page: {
    narrow: {
      width: {
        min: '336px',
        max: 'large'
      }
    },
    wide: {
      width: {
        min: '336px',
        max: 'xxlarge'
      }
    },
    full: {
      width: {
        min: '336px',
        max: '100%'
      }
    },
  }
};

function App() {
  const [selectors] = useDeviceSelectors(window.navigator.userAgent);
  const dispatch = useAppDispatch();
  const { isMobile } = selectors;

  useEffect(() => {
    // Display Accordion view by default for mobile device
    if (isMobile)
      dispatch(setToggleGroup('accordion'));
  }, [isMobile, dispatch])

  return (
    <Grommet
      full
      theme={theme}
      options={{
        box: {
          cssGap: true,
        },
      }}
    >
      <Box overflow="auto">
        <ErrorBoundary>
          <DeviceContext.Provider value={isMobile}>
            <AppHeader />
            <Outlet />
          </DeviceContext.Provider>
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
      </Box>
    </Grommet>
  )
}

export default App
