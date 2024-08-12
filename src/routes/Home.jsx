import './Home.css';
import Card from '../components/Card';
import CreateBankAccount from '../components/CreateBankAccount';
import { useContext, useEffect, useState } from 'react';
import { loggedUserContext } from '../contexts/UserContext';
import api from '../services/api'

export default function Home() {
  const { loggedUser } = useContext(loggedUserContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [client, setClient] = useState({});
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    const getClientInfo = async (email) => {
      try {
        const { data: client } = await api.get(`/client/user/${email}`);
        return client;
      } catch (error) {
        setErrorMessage("Erro ao tentar pegar os dados do cliente.");
        console.error(error);
      }
    }

    const getClientBankAccounts = async (id) => {
      try {
        const { data } = await api.get(`/account/client/${id}`);
        // console.log(data); // dados da conta 
        return data;
      } catch (error) {
        setErrorMessage("Erro ao tentar pegar dados do banco.");
        console.error(error);
      }
    }

    const loadClientAndAccounts = async () => {
      if (loggedUser?.email) {
        const clientData = await getClientInfo(loggedUser.email);
        if (clientData) {
          setClient(clientData);
          const accounts = await getClientBankAccounts(clientData.id);
          accounts && setBankAccounts(accounts);
          console.log(bankAccounts)
        }
      }
    }

    loadClientAndAccounts();
  }, [loggedUser?.email]);


  return (
    <>
      {bankAccounts.length === 0 ? <CreateBankAccount /> : <Card />}
      <span>{error && errorMessage}</span>
    </>
  )
}