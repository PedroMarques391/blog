import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import PostDetail from '../../components/PostDetail';

function Search() {
  const query = useQuery();
  const search = query.get('q');
  const { documents: posts } = useFetchDocuments('posts', search);
  return (
    <section className="w-full flex flex-col justify-center items-center md:max-w-[80%] mx-auto">
      <h1 className="my-10 font-medium text-xl capitalize">{`Exibindo resultados para ${search}`}</h1>
      <div className="text-center mt-5 flex flex-col md:flex-row flex-wrap md:gap-10 justify-center w-[90%] md:w-full">
        {posts && posts.length === 0 && (
        <div>
          <p>Não foram encontrados resultados referentes a sua busca</p>
          <Link to="/">Voltar</Link>
        </div>
        )}
        {posts && posts.map((post) => (
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
      </div>
    </section>
  );
}

export default Search;
