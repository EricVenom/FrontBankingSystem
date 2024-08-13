import { loggedUserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import api from '../services/api'
import './Card.css';

export default function Card({ type, balance }) {

    return (
        <>
            <div className="bank-card">
                <span>Saldo: <br />
                    <strong>
                        {balance ? balance : "00,00"}R$
                    </strong>
                </span> <br />
                <span>{type === "CURRENT" ? "CONTA CORRENTE" : "POUPANÇA"}</span>
            </div>
        </>
    )
}