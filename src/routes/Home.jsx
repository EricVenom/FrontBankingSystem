import './Home.css';
import Card from '../components/Card';
import CreateBankAccount from '../components/CreateBankAccount';
import { useContext, useEffect, useState } from 'react';
import { loggedUserContext } from '../contexts/UserContext';
import api from '../services/api'
import { getCookie } from '../utils/storage';
import BasicTable from '../components/BasicTable';
import LinearIndeterminate from '../components/LinearIndeterminate';

export default function Home() {
  const { loggedUser, loggedBankAccounts, setLoggedBankAccounts, setLoggedPixKeys } = useContext(loggedUserContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [client, setClient] = useState({});
  const [bankAccounts, setBankAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [keyList, setKeyList] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getClientInfo = async (email) => {
      try {
        const { data: client } = await api.get(`/client/user/${email}`, {
          headers: {
            Authorization: `Bearer ${getCookie("auth")}`
          }
        });
        return client;
      } catch (error) {
        setErrorMessage("Erro ao tentar pegar os dados do cliente.");
        console.error(error);
      }
    }

    const getClientBankAccounts = async (id) => {
      try {
        const { data } = await api.get(`/account/client/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("auth")}`
          }
        });
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
          setLoggedBankAccounts([...accounts]);

          // const accountIds = accounts.map(account => account.id);
          // localStorage.setItem('bankAccountIds', JSON.stringify(accountIds));
        }
      }
    }

    loadClientAndAccounts();
  }, [loggedUser?.email]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (bankAccounts.length > 0) {
          // Fazendo as duas requisições em paralelo
          const requests = bankAccounts.map(account =>
            api.get(`/transaction/${account.id}`, {
              headers: {
                Authorization: `Bearer ${getCookie("auth")}`
              }
            })
          );

          const responses = await Promise.all(requests);
          const allTransactions = responses
            .map(response => response.data)
            .flat(); // combinar os arrays de transações

          setTransactions(allTransactions);
        }
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchTransactions();
  }, [bankAccounts]);

  useEffect(() => {
    const fetchingKeys = async () => {
      try {
        setLoading(true);
        if (loggedBankAccounts?.length > 0) {
          const requests = loggedBankAccounts.map(account =>
            api.get(`/pix-key/account/${account.id}`, {
              headers: {
                Authorization: `Bearer ${getCookie("auth")}`
              }
            })
          );

          const responses = await Promise.all(requests);

          const allPixKeys = responses
            .map(response => response.data)
            .flat();

          setKeyList(allPixKeys);
        }

        keyList && setLoggedPixKeys(keyList)
      } catch (error) {
        console.log("fetchingKeys():", error);
      } finally {
        setLoading(false);
      }
    }

    fetchingKeys();
  }, [loggedBankAccounts]);

  return (
    <section className="home-container">
      <section className="bank-info">
        {bankAccounts.length === 0 && <CreateBankAccount />}
        {bankAccounts.length > 0 && bankAccounts.map((e) => {
          return (
            <Card key={e.id} type={e.accountType} balance={e.balance} number={e.number} />
          )
        })}


        <Card pix={true} />
        <span>{error && errorMessage}</span>
      </section>
      <section className="bank-log">
        <h3>Ultimas movimentações</h3>
        <BasicTable transactions={transactions} />
        {transactions.length === 0 && "Ainda não há transações."}
      </section>

      {loading && <LinearIndeterminate />}
    </section>
  )
}