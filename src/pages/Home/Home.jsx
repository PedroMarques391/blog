import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetail';

function Home() {
  const [query, setQuery] = useState('');
  const { documents: posts, loading } = useFetchDocuments('posts');
  const navigate = useNavigate();

  const topics = [
    'programação', 'javascript', 'java',
    'tecnologia', 'react', 'front-end',
    'back-end', 'estudos', 'python',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      const route = navigate(`/search?q=${query}`);
      return route;
    }
    return <p>Sem resultados</p>;
  };

  return (
    <section className="w-full flex flex-col justify-center items-center mt-10 md:max-w-max lg:mx-auto lg:max-w-[80%]">
      <h1 className="text-xl text-center font-semibold font-montserrat md:text-2xl p-8">Veja as postagens mais recentes</h1>
      <form
        className="flex justify-center w-11/12 md:w-full lg:w-3/5 max-w-full mb-5"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Ou busque por tags..."
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          className="mr-3 w-3/4 md:w-3/5 lg:w-1/2 bg-transparent border-b border-gray-500"
        />
        <button
          className="bg-black text-white rounded-lg hover:bg-slate-600 transition-all duration-700 flex justify-center items-center w-1/4 md:w-20"
        >
          <IoIosSearch className="text-4xl" />
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
        <div className="md:col-span-2 lg:col-span-3">
          {loading && <p>Carregando...</p>}
          {posts && posts.map((post) => (
            <PostDetail
              key={post.id}
              post={post}
              stylesHome={[
                'sectionHomePage', 'linkHomePage', 'imageHomePage',
                'divContainerHomePage', 'h2HomePage', 'p1HomePage',
                'divReadAndDateHomePage', 'mr-1', 'tagButtonHomePage',
                'link2HomePage', 'hidden', 'hiddenTag',
              ]}
              stylesSearch={[]}
            />
          ))}

          {posts && posts.length === 0 && (
          <div>
            <section className="h-screen flex justify-center items-center w-full">
              <svg className="animate-spin h-16 w-h-16 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </section>
          </div>
          )}
        </div>
        <div className="hidden md:block md:col-span-2 lg:col-span-2">
          <h1 className="mt-5 text-lg font-bold w-3/4 md:mx-auto">Descubra mais do que é importante para você</h1>
          <div className="flex w-3/5 font-semibold font-montserrat tracking-wide justify-center flex-wrap ml-4 md:mx-auto lg:w-3/4 lg:gap-x-4 lg:gap-y-2">
            {topics.map((tag) => (
              <button
                onClick={() => navigate(`/search?q=${tag}`)}
                className="mr-3 mt-3 p-4 text-center rounded-full bg-gray-200"
                key={tag}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="w-3/4 mt-5 mx-auto">
            <h1 className="mt-5 text-lg font-bold my-4">Última postagem</h1>
            <section>
              {posts && posts.slice(0, 1).map((post) => (
                <PostDetail
                  key={post.id}
                  post={post}
                  stylesSearch={
              [
                'sectionPageSearch', 'imagePageSearch',
                'h2PageSearch', 'divAdditionalInfoPageSearch',
                'p1PageSearch', 'divReadAndDate', 'pDate', 'apply',
                'linkPageSearch', 'tagsContainerPageSearch', 'tagsPageSearch',
                'hidden',
              ]
            }
                  stylesHome={[]}
                />
              ))}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
