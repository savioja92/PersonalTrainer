import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Trainings from './Components/Trainings.tsx';
import Customers from './Components/Customers.tsx';
import Calendar from './Components/Calendar.tsx'
import Stats from './Components/Stats.tsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          element: <Trainings />,
          index: true
        },
        {
          path: "customers",
          element: <Customers />
        },
        {
          path: "calendar",
          element: <Calendar />
        },
        {
          path: "stats",
          element: <Stats />
        }
      ]
    },
  ],
  { basename: "/PersonalTrainer" }
);





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
