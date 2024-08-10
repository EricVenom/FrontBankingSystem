export default function FormularioCliente({ user, setUser }) {
  return (
    <>
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
    </>
  )
}