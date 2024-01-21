import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

function Post() {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument('posts', id);

  const navigate = useNavigate();
  return (
    <section className="text-center w-full mx-auto">
      {loading && (
        <section className="h-screen flex justify-center items-center">
          <svg className="animate-spin -ml-1 mr-3 h-16 w-h-16 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </section>
      )}
      {post && (
      <section className="flex flex-col items-center md:mt-10 p-5 md:p-0">
        <img
          className="md:max-w-3xl mb-3 md:h-[600px]"
          src={post.image}
          alt={post.title}
        />
        <div className="w-full md:max-w-3xl">
          <h1 className="text-left md:py-5 font-bold text-3xl md:text-5xl capitalize">{post.title}</h1>
          <h2 className="text-left py-1 text-gray-600 text-lg md:text-xl capitalize">{post.subTitle}</h2>
          <h2 className="text-left py-1 text-gray-600 text-lg md:text-xl">
            Escrito por
            {' '}
            {post.createBy}
          </h2>
          <h2 className="text-left py-1 text-gray-600 text-base md:text-lg">
            Leitura de
            {' '}
            {post.read}
            {' '}
            minutos
          </h2>
          <article className="leading-8 text-lg text-balance text-left font-open-sans">
            <h1 className="font-bold text-2xl my-4">Introdução</h1>
            <div className="mb-5">{post.introduction}</div>
            <h1 className="font-bold text-2xl my-4">Artigo</h1>
            <div>{post.body}</div>
          </article>
          <h3 className="font-bold md:text-xl my-3 text-left">Esse post trata sobre: </h3>
          <div className="flex justify-center md:justify-start">
            {post.tagsArray.map((tag) => (
              <button
                onClick={() => navigate(`/search?q=${tag}`)}
                className="mr-3 p-3 text-center rounded-full md:text-xl bg-gray-200"
                key={tag}
              >

                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>
      )}
    </section>
  );
}

export default Post;
