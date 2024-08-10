import BtnCadastro from './BtnCadastro';
import './Modal.css';
import { useState } from 'react';
import axios from 'axios';
import api from '../services/api';
import { setCookie, getCookie } from '../utils/storage';
import { Checkbox, Button } from '@mui/material';
import FormularioUsuario from './FormularioUsuario';
import FormularioEndereco from './FormularioEndereco';
import FormularioCliente from './FormularioCliente';
import LinearIndeterminate from './LinearIndeterminate';
import { useNavigate } from 'react-router-dom';

const steps = ["Crie seu usuário", "Informe seu endereço", "Preencha seu perfil com seus dados pessoais"];

function Modal({ setModalActive }) {
  const [loader, setLoader] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

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
    setLoader(true);

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
          setTimeout(() => {
            navigate('/dashboard')
          }, 5000)
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
            <legend>
              Complete os campos para abrir sua conta ACCBank.
              <br />
            </legend>
            <br />
            {step === 1 && <FormularioUsuario user={user} setUser={setUser} />}
            {step === 2 && <FormularioEndereco user={user} setUser={setUser} />}
            {step === 3 && <FormularioCliente user={user} setUser={setUser} />}

            <section>
              {step === 1 ? <div className="stepper" id="step-active"></div> : <div className="stepper"></div>}
              {step === 2 ? <div className="stepper" id="step-active"></div> : <div className="stepper"></div>}
              {step === 3 ? <div className="stepper" id="step-active"></div> : <div className="stepper"></div>}
            </section>
            <section>
              {step === 1 ? <Button variant='outlined' disabled>Voltar</Button> : <Button variant='outlined' onClick={prevStep}>Voltar</Button>}
              {step === 3 ? <Button variant='contained' disabled>Avançar</Button> : <Button variant='contained' onClick={nextStep}>Avançar</Button>}
            </section>
            <br />
            {loader && <LinearIndeterminate />}
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
            {step === 3 && <BtnCadastro textoDoBotao="Cadastrar" setModalActive={setModalActive} />}
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Modal;
