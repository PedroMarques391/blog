import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [read, setRead] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState('');

  const { insertDocument, response } = useInsertDocument('posts');
  const { user } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors('');

    try {
      new URL(image);
    } catch (error) {
      setFormErrors('A imagem precisa ser uma URL.');
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormErrors('Todos os dados precisam ser preenchidos.');
    }

    if (formErrors) {
      return;
    }

    insertDocument({
      title,
      image,
      subTitle,
      introduction,
      body,
      tagsArray,
      read,
      uid: user.uid,
      createBy: user.displayName,
    });

    navigate('/');
  };

  return (
    <section className="flex justify-center items-center">
      <section className="text-center md:w-4/5 lg:w-3/5 mx-auto mt-5 glassEffect flex justify-center items-center flex-col rounded-xl py-10">
        <h2 className="font-bold text-xl">Novo Post</h2>
        <p className="text-gray-600 my-5 text-lg">No que você está pensando?</p>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="title"
              placeholder="Título"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>

          <label>
            <input
              type="text"
              name="image"
              placeholder="Imagem"
              required
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>
          <p className="font-bold text-2xl my-3">Conteúdo:</p>
          <label>
            <textarea
              name="subTitle"
              placeholder="Subtítulo do post"
              required
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
            />
          </label>
          <label>
            <textarea
              name="introduction"
              placeholder="Introdução do Post"
              required
              onChange={(e) => setIntroduction(e.target.value)}
              value={introduction}
            />
          </label>
          <label>
            <textarea
              name="body"
              placeholder="Corpo do Post"
              required
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
          </label>

          <label>
            <input
              type="number"
              name="read"
              placeholder="Tempo de leitura"
              required
              onChange={(e) => setRead(e.target.value)}
              value={read}
            />
          </label>

          <label>
            <input
              type="text"
              name="tags"
              placeholder="Insira as tags separadas por vírgulas"
              required
              onChange={(e) => setTags(e.target.value)}
              value={tags}
            />
          </label>
          {!response.loading && <button className="btnDark">Cadastrar</button>}
          {response.loading && <button className="btnDark" disabled>Aguarde...</button> }
          {response.error && <p className="error">{response.error}</p>}
          {formErrors && <p className="error">{formErrors}</p>}
        </form>
      </section>
    </section>
  );
}

export default CreatePost;
