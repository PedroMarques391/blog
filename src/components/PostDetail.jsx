import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PostDetail({ post, stylesSearch, stylesHome }) {
  const navigate = useNavigate();

  const date = new Date(post.createAt.seconds * 1000 + post.createAt.nanoseconds / 1e6);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return (
    <section className={`${stylesSearch[0]} ${stylesHome[0]}`}>

      <Link
        className={stylesHome[1]}
        to={`/posts/${post.id}`}
      >
        <img
          className={`${stylesSearch[1]} ${stylesHome[2]}`}
          src={post.image}
          alt={post.title}
        />

      </Link>
      <div className={stylesHome[3]}>
        <h2 className={`${stylesSearch[2]} ${stylesHome[4]}`}>{post.title}</h2>
        <p className={`${stylesSearch[3]} ${stylesHome[5]}`}>
          Escrito por:
          {' '}
          {post.createBy}
        </p>
        <div className={`${stylesSearch[5]} ${stylesHome[6]}`}>
          <p className={`${stylesSearch[6]} ${stylesHome[7]}`}>
            {`${day}/${month}/${year}`}
          </p>
          <p className={`${stylesSearch[6]} ${stylesHome[7]}`}>•</p>
          <p className={`${stylesSearch[7]} ${stylesHome[7]}`}>
            {post.read}
            {' '}
            min
          </p>
          <p className={`${stylesSearch[11]} ${stylesHome[7]} ${stylesHome[11]}`}>•</p>
          <button
            onClick={() => navigate(`/search?q=${post.tagsArray[0]}`)}
            className={`${stylesSearch[11]} ${stylesHome[8]} ${stylesHome[11]}`}
            key={post.tagsArray[0]}
          >
            {post.tagsArray[0]}

          </button>
        </div>
        <Link
          to={`/posts/${post.id}`}
          className={`${stylesSearch[8]} ${stylesHome[9]}`}
        >
          <p className="">{post.body}</p>

        </Link>
      </div>

      <div className={`${stylesSearch[9]} ${stylesHome[10]}`}>
        {post.tagsArray.map((tag) => (
          <button
            onClick={() => navigate(`/search?q=${tag}`)}
            className={stylesSearch[10]}
            key={tag}
          >

            {tag}
          </button>
        ))}
      </div>

    </section>
  );
}

export default PostDetail;
