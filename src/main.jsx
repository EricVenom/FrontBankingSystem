import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoggedUserContextProvider } from './contexts/UserContext';
import App from './routes/App';
import './index.css';
import ErrorPage from './error-page';
import LoginPage from './routes/Login';
import Dashboard from './routes/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Home from './routes/Home';
import Deposito from './routes/Deposito';
import Saque from './routes/Saque';
import Ted from './routes/Ted';
import SendPix from './routes/SendPix';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login/",
    element: <LoginPage />
  },
  {
    path: "/dashboard/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/",
        element: <Home />
      },
      {
        path: "/dashboard/transactions/withdraw",
        element: <Saque />
      },
      {
        path: "/dashboard/transactions/deposit",
        element: <Deposito />
      },
      {
        path: "/dashboard/transactions/transfer",
        element: <Ted />
      },
      {
        path: "/dashboard/transactions/pix",
        element: <SendPix />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoggedUserContextProvider>
      <RouterProvider router={router} />
    </LoggedUserContextProvider>
  </React.StrictMode>,
)
