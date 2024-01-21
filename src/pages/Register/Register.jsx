import React, { useEffect, useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais.');
      return;
    }
    const res = await createUser(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <section className="text-center w-3/5 mx-auto mt-5">
      <h1 className="font-bold text-xl mt-5">Cadastre-se para postar</h1>
      <p className="text-gray-400">Crie seu usuário e compartilhe suas hístorias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do Usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>Email: </span>
          <input
            type="text"
            name="email"
            required
            placeholder="Email de usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirme sua senha</span>
          <input
            className="mb-10"
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn btnDark">Cadastrar</button>}
        {loading && <button className="btn btnDark" disabled>Aguarde...</button> }
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}

export default Register;
