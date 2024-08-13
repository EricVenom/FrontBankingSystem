import { Button } from '@mui/material';
import "./Deposito.css";
import LinearIndeterminate from '../components/LinearIndeterminate';
import api from '../services/api';
import { useState } from 'react';
import { getCookie } from "../utils/storage";

export default function () {
    const [depositData, setDepositData] = useState({
        accountType: "",
        value: 0
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { status } = await api.post("/transaction/deposit", {
                accountType: depositData.accountType,
                value: depositData.value
            }, {
                headers: {
                    Authorization: `Bearer ${getCookie("auth")}`
                }
            });

            status && setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <>
            <form className="deposito">
                <label>Informe a quantidade que deseja depositar:</label>
                <input
                    type="number"
                    placeholder='(Máx. 1000R$)'
                    onChange={e => setDepositData({ ...depositData, value: e.target.value })}
                /><br />

                <label>Qual o tipo da conta?</label>
                <select
                    onChange={e => setDepositData({ ...depositData, accountType: e.target.value })}
                >
                    <option value="CURRENT">1. Conta Corrente</option>
                    <option value="SAVINGS">2. Poupança</option>
                </select><br />

                <Button variant='text' onClick={handleSubmit}>Depositar</Button>
                {loading && <LinearIndeterminate />}
            </form>
        </>
    )
}