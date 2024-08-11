import { Outlet, Link } from 'react-router-dom';
import { getCookie, deleteCookie } from '../utils/storage';
import './Dashboard.css';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { loggedUserContext } from '../contexts/UserContext';

export default function Dashboard() {

  const { loggedUser } = useContext(loggedUserContext);
  const [client, setClient] = useState({});

  useEffect(() => {

    const fetchClient = async (email) => {
      try {
        const { data: client } = await api.get(`/client/user/${email}`);
        console.log(client);
        return client;
      } catch (error) {
        console.log(error)
      }
    }

    const loadClient = async () => {
      if (loggedUser?.email) {
        const fetchedClient = await fetchClient(loggedUser.email);
        if (fetchedClient) {
          setClient(fetchedClient);
        }
      }
    }

    loadClient();

  }, [loggedUser?.email]);

  return (
    <div className="dashboard">
      <header>
        <h1>ACCBANK</h1>
        <section>
          <span>O</span>
          <span>P</span>
          <Button><LogoutIcon /></Button>
        </section>
      </header>
      <section className='fake-header'>
        <span>Bem vindo, {client?.name}!</span>
        <nav>
          <ul>
            <li>
              <Link to={"/dashboard/"}> <HomeIcon /> </Link>
            </li>
            <li>
              <Link to={"/dashboard/transactions/withdraw"}>Saque</Link>
            </li>
            <li>
              <Link to={"/dashboard/transactions/deposit"}>Deposito</Link>
            </li>
            <li>
              <Link to={"/dashboard/transactions/transfer"}>Transferencia</Link>
            </li>
          </ul>
        </nav>
      </section>
      <div id="detail"><Outlet /></div>
    </div >
  )
}