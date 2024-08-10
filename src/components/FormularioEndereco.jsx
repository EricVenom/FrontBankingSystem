export default function FormularioEndereco({ user, setUser }) {
  return (
    <>
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
    </>
  )
}