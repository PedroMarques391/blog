import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="flex items-center justify-center h-[60vh] mt-3">
      <div className=" p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Ops! Algo deu errado.</h2>
        <p className="text-gray-600 mb-3">
          Parece que essa página não existe, ou você não tem permisão para acessar.
        </p>
        <Link to="/" className="text-gray-600">
          Clique aqui para voltar
        </Link>
        <Link to="/">
          <img
            src="https://media.istockphoto.com/id/1334645334/video/error-with-glitch-effect-on-screen-error-404-page-not-found-motion-graphics.jpg?s=640x640&k=20&c=UOUyKCEVdOZOZ0t21s1vBlU3FmhLyMtJ6gxLwSmWn7M="
            alt="Erro"
            className="max-w-full h-auto"
          />

        </Link>
      </div>
    </div>
  );
}

export default Error;
