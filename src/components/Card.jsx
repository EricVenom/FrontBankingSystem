import { loggedUserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import api from '../services/api'
import './Card.css';

export default function Card({ balance }) {
    const { loggedUser } = useContext(loggedUserContext);

    return (
        <>
            <div className="bank-card">
                <span>Saldo: <br />
                    {balance ? balance : "00,00"}R$
                </span> <br />
                <span>{loggedUser?.email}</span>
            </div>
        </>
    )
}