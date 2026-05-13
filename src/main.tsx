import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom";
import App from './App.tsx'
import { MiracleList } from './MiracleList.tsx';
import { Miracle } from './Miracle.tsx';
import { NotFound } from './404.tsx';
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
        path: "/:country/:city/:year",
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
    <RouterProvider router={router} />
  </StrictMode>,
)
