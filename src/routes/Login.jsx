import "./Login.css";
import { useNavigate } from 'react-router-dom';
import BtnCadastro from "../components/BtnCadastro";
import AccentureLogo from "../assets/logo.png";
import { useContext, useState } from "react";
import { loggedUserContext } from '../contexts/UserContext.jsx'
import { setCookie } from "../utils/storage.js"
import api from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [user, setUser] = useState(
    {
      email: "",
      password: ""
    }
  )
  const { setLoggedUser } = useContext(loggedUserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const { email, password } = user;
    if (email && password) {
      try {
        const { data } = await api.post('/auth', {
          email,
          password
        });

        setCookie("auth", data.token, 1);
        setCookie("authRefresh", data.tokenRefresh, 15);

        localStorage.setItem('loggedUser', JSON.stringify({ email }));
        setLoggedUser({ email });
        navigate("/dashboard");
      } catch (e) {
        setError(true);
        console.error(e)
      }
    }

    setUser({
      email: "",
      password: ""
    })
  }

  return (
    <div className="container">
      <main>
        <section className="left">
          <fieldset>
            <img src={AccentureLogo} />
            <form onSubmit={handleSubmit}>
              <h2>Acesse sua conta</h2>

              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="E-mail"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />

              <input
                type="password"
                name="password"
                value={user.password}
                placeholder="Digite sua senha"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span id="error">
                {error && "Credenciais inválidas"}
              </span>
              <BtnCadastro textoDoBotao="Entrar" setModalActive={() => { }} />

              <a href="/">Voltar à página inicial</a>
            </form>
          </fieldset>
        </section>
        <section className="right"></section>
      </main>
    </div>
  )
}