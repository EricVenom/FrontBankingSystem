import './BtnCadastro.css'


function BtnCadastro({ textoDoBotao, setModalActive }) {
    const abrirModal = () => {
        setModalActive(true)
    }

    return (
        <>
            <button
                className="btn-cadastro"
                onClick={abrirModal}
            >
                {textoDoBotao}
            </button>
        </>
    )
}

export default BtnCadastro;