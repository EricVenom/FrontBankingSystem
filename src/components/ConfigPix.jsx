import { useContext, useState, useEffect } from 'react';
import { loggedUserContext } from '../contexts/UserContext';
import { Button } from '@mui/material';
import { getCookie } from '../utils/storage';
import api from '../services/api'
import DeleteIcon from '@mui/icons-material/Delete';
import LinearIndeterminate from './LinearIndeterminate';
import "./ConfigPix.css"

export default function ConfigPix({ setConfigPix }) {
    const { loggedUser, loggedBankAccounts, loggedPixKeys, setLoggedPixKeys } = useContext(loggedUserContext);
    const enumArray = ["CPF", "CNPJ", "EMAIL", "TELEPHONE"];
    const [loading, setLoading] = useState(false);

    const [selectedKey, setSelectedKey] = useState('');
    const [inputValue, setInputValue] = useState('');

    const [newKey, setNewKey] = useState({
        accountId: "",
        keyType: "",
        keyValue: ""
    });

    useEffect(() => {
        switch (selectedKey) {
            case "CPF":
                setInputValue(loggedUser?.cpf || '');
                break;
            case "EMAIL":
                setInputValue(loggedUser?.email || '');
                break;
            case "TELEPHONE":
                setInputValue(loggedUser?.telephone || '');
                break;
            case "CNPJ":
                setInputValue(''); // Deixe o campo em branco para CNPJ
                break;
            default:
                setInputValue('');
        }
    }, [selectedKey, loggedUser]);

    const handleSelectChange = (e) => {
        setSelectedKey(e.target.value);
    };

    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
            setConfigPix(false);
        }
    }

    const deletePixKey = async (id) => {
        try {
            setLoading(true);
            await api.delete(`/pix-key/${id}`, {
                headers: {
                    Authorization: `Bearer ${getCookie("auth")}`
                }
            });

            setLoggedPixKeys(loggedPixKeys.filter(key => key.id !== id));

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const addPixKey = async () => {
        try {
            setLoading(true);
            const { accountId, keyType, keyValue } = { ...newKey, keyType: selectedKey, keyValue: inputValue };

            if (accountId && keyType && keyValue) {
                const { data: key } = await api.post(`/pix-key/account/${accountId}`, {
                    keyType,
                    keyValue
                }, {
                    headers: {
                        Authorization: `Bearer ${getCookie("auth")}`
                    }
                });

                setLoggedPixKeys([...loggedPixKeys, key]);
            }

        } catch (error) {
            console.log("addPixKey(): ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <fieldset className="pix-config">
                <section className="pix-config-header">
                    <h2>Chaves Cadastradas</h2>

                    <div className="pix-row">
                        {loggedPixKeys.length !== 0 ? loggedPixKeys?.map(e => <div>
                            <span>{e.keyType}</span>
                            <span>{e.keyValue}</span>
                            <Button onClick={() => deletePixKey(e.id)}><DeleteIcon fontSize='small' /></Button>
                        </div>) : "Não há chaves cadastradas"}
                    </div>

                </section>
                <section className="all-keys">
                    <form>
                        <legend>
                            Criar chave
                        </legend>
                        <select value={newKey.accountId} onChange={e => setNewKey({ ...newKey, accountId: e.target.value })}>
                            <option value="">Selecione uma conta</option>
                            {loggedBankAccounts.map(a => (
                                <option key={a.id} value={a.id}>
                                    {a.accountType === "SAVINGS" ? "POUPANÇA" : "CONTA CORRENTE"}
                                </option>
                            ))}
                        </select>

                        <select value={selectedKey} onChange={handleSelectChange}>
                            <option value="" disabled>Selecione uma chave</option>
                            {enumArray.map((e) =>
                                <option key={e} value={e}>{e}</option>
                            )}
                        </select>

                        <input
                            className="pix-key-input"
                            type="text"
                            placeholder='Chave*'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} // Permite edição manual para CNPJ
                            disabled={selectedKey !== "CNPJ"} // Permite edição manual apenas para CNPJ
                        />

                        <Button variant="contained" onClick={addPixKey}>Adicionar</Button>
                        <Button variant="text" onClick={() => setConfigPix(false)}>Cancelar</Button>
                        {loading && <LinearIndeterminate />}
                    </form>
                </section>
            </fieldset>
        </div>
    )
}