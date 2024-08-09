import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './routes/App'
import './index.css'
import ErrorPage from './error-page'
import LoginPage from './routes/Login'
import Dashboard from './routes/Dashboard'

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
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/",
        element: <h1>Mostrando extrato, historico de transações!!</h1>
      },
      {
        path: "/dashboard/transactions/withdraw",
        element: <h1>PAGINA DE SAQUE</h1>
      },
      {
        path: "/dashboard/transactions/deposit",
        element: <h1>PAGINA DE DEPOSITO</h1>
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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
