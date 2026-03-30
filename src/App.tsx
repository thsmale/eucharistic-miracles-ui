import {
  Grommet,
} from 'grommet';
import { Outlet } from 'react-router';
import { AppHeader } from './Header';

function App() {
  return (
    <Grommet full='min'>
      <AppHeader />
      <Outlet />
    </Grommet>
  )
}

export default App
