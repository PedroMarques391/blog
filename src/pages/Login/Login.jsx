import { useState, useEffect } from 'react';
import { GoPersonFill } from 'react-icons/go';
import { useAuthentication } from '../../hooks/useAuthentication';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const user = {
      email,
      password,
    };

    const res = await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <section className="flex justify-center items-center h-[60vh]">
      <section className="text-center md:w-4/5 lg:w-2/5 mx-auto mt-5 glassEffect flex justify-center items-center flex-col rounded-xl py-10">
        <h1 className="font-bold text-5xl mt-5"><GoPersonFill /></h1>
        <p className="text-gray-600 my-5 uppercase text-xl">Login de Administrador</p>
        <form
          onSubmit={handleSubmit}
        >
          <label>
            <input
              type="text"
              name="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              required
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {!loading && <button className="btnDark">LOGIN</button>}
          {loading && <button className="btnDark" disabled>Aguarde...</button> }
          {error && <p className="error">{error}</p>}
        </form>
      </section>
    </section>
  );
}

export default Login;
