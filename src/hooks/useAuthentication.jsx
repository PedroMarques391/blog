import { useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { db } from '../firebase/config';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    setError('');
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });
      setLoading(false);
      return user;
    } catch (erro) {
      let systemErrorMessage;
      if (erro.message.includes('Password')) {
        systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.';
      } else if (erro.message.includes('email-already')) {
        systemErrorMessage = 'Email já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde.';
      }
      return (
        setLoading(false),
        setError(systemErrorMessage)
      );
    }
  };

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return setLoading(false);
    } catch (erro) {
      let systemErrorMessage;
      if (erro.message.includes('invalid-email')) {
        systemErrorMessage = 'O usuário não existe.';
      } else if (erro.message.includes('invalid-credential')) {
        systemErrorMessage = 'Senha incorreta.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde.';
      }
      return (
        setLoading(false),
        setError(systemErrorMessage)
      );
    }
  };

  useEffect(() => () => setCancelled(true), []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
