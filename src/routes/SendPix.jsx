import { Button } from '@mui/material';
import LinearIndeterminate from '../components/LinearIndeterminate';
import api from '../services/api';
import { useState, useContext } from 'react';
import { getCookie } from "../utils/storage";
import { useNavigate } from 'react-router-dom';
import { loggedUserContext } from '../contexts/UserContext'

export default function SendPix() {
    const [pixData, setPixData] = useState({
        pixKey: "",
        accountType: "",
        value: 0
    });

    const { loggedBankAccounts } = useContext(loggedUserContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { status } = await api.post("/transaction/pix", {
                pixKey: pixData.pixKey,
                accountType: pixData.accountType,
                value: pixData.value
            }, {
                headers: {
                    Authorization: `Bearer ${getCookie("auth")}`
                }
            });

            status && setLoading(false);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form className="deposito">
                <h2>PIX</h2>
                <label>Chave Pix:</label>
                <input
                    type="text"
                    placeholder='Chave*'
                    onChange={e => setPixData({ ...pixData, pixKey: e.target.value })}
                /><br />

                <label>Valor:</label>
                <input
                    type="number"
                    placeholder='(Máx. 1000R$)'
                    onChange={e => setPixData({ ...pixData, value: e.target.value })}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                    }}
                /><br />

                <label>De qual conta enviar?</label>
                <select
                    onChange={e => setPixData({ ...pixData, accountType: e.target.value })}
                >
                    <option value=""></option>
                    {loggedBankAccounts.map(a => <>
                        <option value={a.accountType}>{a.accountType === "SAVINGS" ? "POUPANÇA" : "CONTA CORRENTE"}</option>
                    </>)}
                </select><br />

                <Button variant='text' onClick={handleSubmit}>Pagar</Button>
                {loading && <LinearIndeterminate />}
            </form>
        </>
    )
}