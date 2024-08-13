import "./Saque.css";
import { useState } from 'react'
import LinearIndeterminate from '../components/LinearIndeterminate';
import api from '../services/api';
import { getCookie } from "../utils/storage";
import { Button } from '@mui/material';

export default function Saque() {

    const [depositData, setDepositData] = useState({
        accountType: "",
        value: 0
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { status } = await api.post("/transaction/withdraw", {
                accountType: depositData.accountType,
                value: depositData.value
            }, {
                headers: {
                    Authorization: `Bearer ${getCookie("auth")}`
                }
            });

            status && setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form className="deposito">
                <h2>Saque</h2>
                <label>Informe a quantidade que deseja sacar:</label>
                <input
                    type="number"
                    placeholder='(Máx. 1000R$)'
                    onChange={e => setDepositData({ ...depositData, value: e.target.value })}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                    }}
                /><br />

                <label>Qual o tipo da conta?</label>
                <select
                    onChange={e => setDepositData({ ...depositData, accountType: e.target.value })}
                >
                    <option value=""></option>
                    <option value="CURRENT">1. Conta Corrente</option>
                    <option value="SAVINGS">2. Poupança</option>
                </select><br />

                <Button variant='text' onClick={handleSubmit}>Sacar</Button>
                {loading && <LinearIndeterminate />}
            </form>
        </>
    )
}