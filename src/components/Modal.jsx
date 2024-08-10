import BtnCadastro from './BtnCadastro';
import './Modal.css';
import { useState } from 'react';
import axios from 'axios';
import api from '../services/api';
import { setCookie, getCookie } from '../utils/storage';
import { Checkbox } from '@mui/material';

function Modal({ setModalActive }) {
  const [step, setStep] = useState(1);

  const cep = axios.create({
    baseURL: 'http://viacep.com.br/ws/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  });

  const [user, setUser] = useState({
    name: "",
    telephone: "",
    cpf: "",
    email: "",
    password: "",
    password2: "",
    cep: "",
    number: "",
    agree: false
  });

  const clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      setModalActive(false);
    }
  }

  const addUser = async ({ email, password }) => {
    try {
      await api.post("/user", {
        email,
        password,
        role: "CLIENT"
      });

      const { data } = await api.post('/auth', { email, password });
      setCookie("auth", data.token, 1);
      setCookie("authRefresh", data.tokenRefresh, 15);

    } catch (error) {
      throw new Error("Erro ao adicionar usuário.");
    }
  }

  const addAddress = async (cep, number, street, district) => {
    try {
      const { data: address } = await api.post("/address", {
        cep,
        number,
        street,
        district
      });
      return address;
    } catch (error) {
      throw new Error("Erro ao adicionar endereço.");
    }
  }

  const addClient = async (user, addressId) => {
    try {
      const { data: client } = await api.post("/client", {
        name: user.name,
        cpf: user.cpf,
        telephone: user.telephone,
        address_id: addressId
      }, {
        headers: {
          Authorization: `Bearer ${getCookie("auth")}`
        }
      });
      return client;
    } catch (error) {
      throw new Error("Erro ao adicionar cliente.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.agree
      && user.cpf.length === 11
      && user.telephone.length === 11
      && user.cep.length === 8) {
      try {
        const { data: addressData, status: addressStatus } = await cep.get(`/${user.cep}/json`);
        const { email, password, password2 } = user;

        if (password === password2 && addressStatus === 200) {
          await addUser({ email, password });

          const address = await addAddress(addressData.cep, user.number, addressData.logradouro, addressData.bairro);

          const client = await addClient(user, address.id);

          console.log("Cliente cadastrado com sucesso:", client);
        } else {
          throw new Error("Senhas não conferem ou CEP inválido.");
        }

      } catch (error) {
        console.log("Erro durante o cadastro:", error.message);
      }
    }
  }

  return (
    <div className="backdrop" onClick={clickHandler}>
      <div className="modal">
        <div>
          <h2>Abra sua conta ACCBank</h2>
          <p onClick={clickHandler}>x</p>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Complete os campos para abrir sua conta ACCBank:</legend>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nome completo*"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              name="telephone"
              id="telephone"
              placeholder="Celular*"
              maxLength={11}
              value={user.telephone}
              onChange={(e) => setUser({ ...user, telephone: e.target.value })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
              }}
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              name="cpf"
              id="cpf"
              placeholder="CPF*"
              value={user.cpf}
              maxLength={11}
              onChange={(e) => setUser({ ...user, cpf: e.target.value })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
              }}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail*"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha*"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Repita a senha*"
              value={user.password2}
              onChange={(e) => setUser({ ...user, password2: e.target.value })}
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              name="cep"
              id="cep"
              placeholder="CEP*"
              value={user.cep}
              maxLength={8}
              onChange={(e) => setUser({ ...user, cep: e.target.value })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
              }}
            />
            <input
              type="text"
              name="house-number"
              id="house-number"
              placeholder="Número da residência*"
              value={user.number}
              onChange={(e) => setUser({ ...user, number: e.target.value })}
            />

            <label htmlFor="agree">
              <Checkbox
                type="checkbox"
                name="agree"
                id="agree"
                checked={user.agree}
                onChange={(e) => setUser({ ...user, agree: e.target.checked })}
              />
              Autorizo o ACCBank a tratar os meus dados pessoais para
              envio de comunicações sobre seus produtos e declaro que li e estou ciente da
            </label>
            <a href="#">política de privacidade</a>
            <BtnCadastro textoDoBotao="Cadastrar" setModalActive={setModalActive} />
            <a href='#' onClick={clickHandler}>Cancelar</a>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Modal;
