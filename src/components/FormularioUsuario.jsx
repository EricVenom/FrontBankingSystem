
export default function FormularioUsuario({ user, setUser }) {
  return (
    <>
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
    </>
  )
}