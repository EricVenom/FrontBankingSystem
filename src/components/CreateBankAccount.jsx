import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import api from '../services/api'
import './CreateBankAccount.css'
import { getCookie } from '../utils/storage'

export default function CreateBankAccount() {
    const [allAgency, setAllAgency] = useState([]);
    const [newAccount, setNewAccount] = useState({
        accountType: "",
        agencyId: ""
    });

    useEffect(() => {
        const getAllAgency = async () => {
            try {
                const { data } = await api.get("/agency", {
                    headers: {
                        Authorization: `Bearer ${getCookie("auth")}`
                    }
                });
                data && setAllAgency(data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllAgency()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/account", {
                accountType: newAccount.accountType,
                agencyId: newAccount.agencyId
            }, {
                headers: {
                    Authorization: `Bearer ${getCookie("auth")}`
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='backdrop'>
            <fieldset className='fdst-new-account'>
                <form className='new-account'>
                    <legend>Abra sua conta:</legend>
                    <select
                        onChange={(e) => {
                            setNewAccount({ ...newAccount, accountType: e.target.value });
                        }}>

                        <option value="">Escolha o tipo da conta... </option>
                        <option value="CURRENT">Conta Corrente</option>
                        <option value="SAVINGS">Conta Poupança</option>

                    </select>

                    <select
                        onChange={(e) => {
                            setNewAccount({ ...newAccount, agencyId: e.target.value });
                        }}>

                        <option value="">Escolha uma agência bancária... </option>
                        {allAgency.map((a) =>
                            <option key={a.id} value={a.id}>{a.name}</option>
                        )}

                    </select>
                    <Button variant='contained' onClick={handleSubmit}>Confirmar</Button>
                </form>
            </fieldset>
        </div>
    )
}