import "./Ted.css";
import { useState } from 'react';
import { Button } from '@mui/material';
import api from "../services/api";
import { getCookie } from "../utils/storage";
import LinearIndeterminate from "../components/LinearIndeterminate";

export default function Ted() {
    const [depositData, setDepositData] = useState({
        accountType: "",
        receiverId: "",
        value: 0
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { status } = await api.post("/transaction/transfer", {
                accountType: depositData.accountType,
                receiverId: depositData.receiverId,
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
                <h2>Transferência Eletrônica Disponível</h2>
                <label>Informe a quantidade que deseja transferir:</label>
                <input
                    type="number"
                    placeholder='(Máx. 1000R$)'
                    onChange={e => setDepositData({ ...depositData, value: e.target.value })}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                    }}
                /><br />

                <label>ID da conta destinatária</label>
                <input type="text" onChange={e => setDepositData({ ...depositData, receiverId: e.target.value })} /><br />

                <label>Qual o tipo da conta?</label>
                <select
                    onChange={e => setDepositData({ ...depositData, accountType: e.target.value })}
                >
                    <option value=""></option>
                    <option value="CURRENT">1. Conta Corrente</option>
                    <option value="SAVINGS">2. Poupança</option>
                </select><br />

                <Button variant='text' onClick={handleSubmit}>Transferir</Button>
                {loading && <LinearIndeterminate />}
            </form>
        </>
    )
}