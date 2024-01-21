import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

function Dashboard() {
  const { user } = useAuthValue();
  const { uid } = user;
  const { documents: posts, loading } = useFetchDocuments('posts', null, uid);
  const { deleteDocument } = useDeleteDocument('posts');

  if (loading) {
    return (
      <section className="h-screen flex justify-center items-center">
        <svg className="animate-spin -ml-1 mr-3 h-16 w-h-16 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </section>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center mt-5">
      <h2 className="text-bold font-medium text-4xl text-center uppercase mb-4">Dashboard</h2>
      <p className="text-gray-600 mb-4 text-xl font-medium">Gerencie os seus posts</p>
      {posts && posts.length === 0
        ? (
          <section className="flex justify-center items-center">
            <div className="h-[60vh] flex flex-col justify-around items-center p-5">
              <p className="text-2xl font-montserrat, font-semibold tracking-[1.1]">Você ainda não tem postagens</p>
              <Link
                className="w-4/5 bg-black p-4 text-white text-center uppercase rounded-lg hover:bg-gray-600 transition-all duration-500"
                to="/posts/create"
              >
                Criar primeiro post

              </Link>
            </div>
          </section>
        )
        : (
          <>
            <div className="flex justify-between w-4/5 p-3 border-b-2 border-gray-400 text-lg uppercase">
              <span>Título</span>
              <span>Ações</span>
            </div>
            {posts && posts.map((post) => (
              <div
                className="flex justify-between w-4/5 py-3 md:p-3 border-b border-gray-400"
                key={post.id}
              >
                <p className="text-gray-600 mb-4 text-lg font-medium text-left w-1/2 md:w-auto">{post.title}</p>
                <div className="flex flex-col md:flex-row w-1/2 md:w-auto">
                  <Link
                    className="btn btnOutline"
                    to={`/posts/${post.id}`}
                  >
                    Ver Post
                  </Link>
                  <Link
                    className="btn btnOutline"
                    to={`/posts/edit/${post.id}`}
                  >
                    Editar

                  </Link>
                  <button
                    className="btn btnOutline btnDanger"
                    onClick={() => deleteDocument(post.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

    </div>
  );
}

export default Dashboard;
