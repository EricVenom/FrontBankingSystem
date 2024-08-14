import { loggedUserContext } from '../contexts/UserContext'
import { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

import PixIcon from '@mui/icons-material/Pix';
import SavingsIcon from '@mui/icons-material/Savings';
import BuildIcon from '@mui/icons-material/Build';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Button } from '@mui/material';
import './Card.css';
import ConfigPix from './ConfigPix';

export default function Card({ pix, type, number, balance }) {
    const [configPix, setConfigPix] = useState(false);
    const { loggedBankAccounts } = useContext(loggedUserContext);

    return (
        <>
            {!pix && <div className="bank-card">
                <span><SavingsIcon /> {type === "CURRENT" ? "CONTA CORRENTE" : "POUPANÇA"}</span><br />
                <span>Saldo Total <br />
                    R$ {balance ? (Math.round(balance * 100) / 100).toFixed(2) : "00,00"}
                </span> <br />
                <span>
                    Numero da conta: {number}
                </span>
            </div>}

            {pix && <div className="bank-card">
                <span><PixIcon /> Área Pix</span><br />
                <Link to={"/dashboard/transactions/pix"}><Button
                    variant="outlined"
                    size="small"
                    sx={{ gap: "1rem", width: "100%", justifyContent: "start" }}
                >
                    <PaymentsIcon /> Transferir
                </Button></Link>

                <Button
                    variant="outlined"
                    size="small"
                    sx={{ gap: "1rem", width: "100%", justifyContent: "start" }}
                    onClick={() => setConfigPix(true)}
                >
                    <BuildIcon /> Gerenciar chaves
                </Button>
                {configPix && <ConfigPix setConfigPix={setConfigPix} />}
                <Outlet />
            </div>

            }
        </>
    )
}