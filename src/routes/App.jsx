import accentureLogo from '../assets/logo.png';
import BtnLogin from '../components/BtnLogin';
import BtnCadastro from '../components/BtnCadastro';
import Modal from '../components/Modal';
import { useState } from 'react';
import './App.css';


function App() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className='container'>
      <header>
        <img src={accentureLogo} />
        <section>
          <BtnLogin />
          <BtnCadastro textoDoBotao="Cadastrar" setModalActive={setModalActive} />
        </section>
      </header>

      <main>
        <article>
          <h1>Muda pro ACC Bank e dê uma turbinada no seu dinheiro</h1>
          <BtnCadastro textoDoBotao="Abra sua conta ➔" setModalActive={setModalActive} />

          {modalActive && <Modal setModalActive={setModalActive} />}
        </article>

        <aside>
        </aside>
      </main>

      <footer>
        <p>© 2024 ACCBank Instituição de Pagamento S/A. CNPJ 11.111.111/1111-11. V1.0.0</p>
      </footer>
    </div>
  )
}

export default App
