import './Home.css';
import Card from '../components/Card';
import CreateBankAccount from '../components/CreateBankAccount';
import { useContext, useEffect, useState } from 'react';
import { loggedUserContext } from '../contexts/UserContext';
import api from '../services/api'
import { getCookie } from '../utils/storage';

export default function Home() {
  const { loggedUser } = useContext(loggedUserContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [client, setClient] = useState({});
  const [bankAccounts, setBankAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

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

    const fetchTransactions = async () => {
      try {
        if (bankAccounts.length > 0) {
          const { data } = await api.get(`/transaction/${bankAccounts[0].id}`, {
            headers: {
              Authorization: `Bearer ${getCookie("auth")}`
            }
          });
          data && setTransactions(data)
        }
        console.log("Transações:", transactions);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };


    const loadClientAndAccounts = async () => {
      if (loggedUser?.email) {
        const clientData = await getClientInfo(loggedUser.email);
        if (clientData) {
          setClient(clientData);
          const accounts = await getClientBankAccounts(clientData.id);
          accounts && setBankAccounts(accounts);
        }
      }
    }

    loadClientAndAccounts();
    fetchTransactions();
  }, [loggedUser?.email]);

  return (
    <section className="home-container">
      <section className="bank-info">
        {bankAccounts.length === 0 && <CreateBankAccount />}
        {bankAccounts.map((e) => {
          return (
            <Card key={e.id} type={e.accountType} balance={e.balance} />
          )
        })}
        <span>{error && errorMessage}</span>
      </section>
      <section className="bank-log">
        <h1>Ultimas movimentações</h1>
        {transactions.length === 0 && "Ainda não há transações."}
      </section>
    </section>
  )
}