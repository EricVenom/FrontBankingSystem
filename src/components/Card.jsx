import { loggedUserContext } from '../contexts/UserContext'
import { useContext, useState } from 'react'
import api from '../services/api'
import './Card.css';

export default function Card({ pix, type, balance }) {

    return (
        <>
            {!pix && <div className="bank-card">
                <span>Saldo: <br />
                    <strong>
                        {balance ? balance : "00,00"} R$
                    </strong>
                </span> <br />
                <span>{type === "CURRENT" ? "CONTA CORRENTE" : "POUPANÇA"}</span>
            </div>}

            {pix && <>
                <h1>Área pix</h1>
            </>

            }
        </>
    )
}