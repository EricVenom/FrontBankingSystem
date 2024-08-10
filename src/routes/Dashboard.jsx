import { Outlet, Link } from 'react-router-dom';
import { getCookie, deleteCookie } from '../utils/storage';
import './Dashboard.css';

export default function Dashboard() {

  const handleLogout = () => {
    //deleteCookie();
  }

  return (

    <div className="dashboard">
      <div id="sidebar">
        <h1>ACCBank</h1>
        <nav>
          <ul>
            <li>
              <Link to={"/dashboard/"}>Home</Link>
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
            <li>
              <button className='logout'>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"><Outlet /></div>
    </div >
  )
}