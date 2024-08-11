import { Outlet, Link } from 'react-router-dom';
import { getCookie, deleteCookie } from '../utils/storage';
import './Dashboard.css';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import api from '../services/api';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dashboard() {

  useEffect(() => {
    // const { data: client } = await api.get('/client/user/${email}');
    // const { data: account } = await api.get('/account/`${client.id}`');
    // console.log(data, account)
  }, [])

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
        <span>Bem vindo, </span>
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