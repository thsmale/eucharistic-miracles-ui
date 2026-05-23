import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom";
import { Provider } from 'react-redux';
import App from './App.tsx'
import { MiracleList } from './MiracleList.tsx';
import { Miracle } from './Miracle.tsx';
import { NotFound } from './404.tsx';
import { store } from './redux/store.ts';
import './index.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <MiracleList />,
      },
      {
        path: "/:country/:city/:year/:part?",
        element: <Miracle />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
