import BtnCadastro from './BtnCadastro';
import './Modal.css'
import { useState } from 'react';

function Modal({ setModalActive }) {

    const [user, setUser] = useState({
        name: "",
        cpf: "",
        email: "",
        password: "",
        password2: "",
        agree: false
    })

    const clickHandler = (e) => {
        if (e.target == e.currentTarget) {
            setModalActive(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)
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
                            name="cpf"
                            id="cpf"
                            placeholder="CPF*"
                            value={user.cpf}
                            onChange={(e) => setUser({ ...user, cpf: e.target.value })}
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

                        <label htmlFor="agree">
                            <input
                                type="checkbox"
                                name="agree"
                                id="agree"
                                value={user.agree}
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