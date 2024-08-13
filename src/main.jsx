import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoggedUserContextProvider } from './contexts/UserContext';
import App from './routes/App';
import './index.css';
import ErrorPage from './error-page';
import LoginPage from './routes/Login';
import Dashboard from './routes/Dashboard';
import Home from './routes/Home';
import Deposito from './routes/Deposito';
import PrivateRoute from './routes/PrivateRoute';

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
        element: <h1>PAGINA DE SAQUE</h1>
      },
      {
        path: "/dashboard/transactions/deposit",
        element: <Deposito />
      },
      {
        path: "/dashboard/transactions/transfer",
        element: <h1>PAGINA DE TRANSFERENCIA</h1>
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
