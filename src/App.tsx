import {
  useEffect,
  useState,
} from 'react';
import {
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
  }
};

function App() {
  const [selectors] = useDeviceSelectors(window.navigator.userAgent);
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  /**
   * Main reason this is an effect is for testing locally
   * So I can easily switch between mobile, tablet, desktop
   * Then see what the UI looks like on each device
   */
  useEffect(() => {
    setIsMobile(selectors.isMobile)
    // Display Accordion view by default for mobile device
    if (selectors.isMobile)
      dispatch(setToggleGroup('accordion'));
  }, [selectors, dispatch])

  return (
    <Grommet full='min' theme={theme}>
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
    </Grommet>
  )
}

export default App
