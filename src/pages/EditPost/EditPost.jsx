import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

function EditPost() {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [body, setBody] = useState('');
  const [read, setRead] = useState('');
  const [tags, setTags] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState('');

  const { updateDocument, response } = useUpdateDocument('posts');
  const { user } = useAuthValue();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      setRead(post.read);
      setIntroduction(post.introduction);
      setSubTitle(post.subTitle);

      const textTags = post.tagsArray.join(', ');
      setTags(textTags);
    }
  }, [post]);

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

    updateDocument(id, {
      title,
      image,
      body,
      read,
      subTitle,
      introduction,
      tagsArray,
      uid: user.uid,
      createBy: user.displayName,
    });

    navigate('/dashboard');
  };

  const handleShowImage = () => {
    setShowImage(!showImage);
  };

  return (
    <section className="flex justify-center items-center">
      <section className="text-center md:w-4/5 lg:w-3/5 mx-auto mt-5 glassEffect flex justify-center items-center flex-col rounded-xl py-10">
        {post && (
        <>
          <h2 className="font-bold text-xl mt-5">
            Editando post:
            {' '}
            {post.title}
          </h2>
          <button
            onClick={handleShowImage}
            className="p-5 font-medium font-sans text-lg"
          >
            Mostrar preview da Imagem atual

          </button>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título</span>
              <input
                type="text"
                name="title"
                placeholder="Título do Post"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>

            <label>
              <span>URL da Imagem:</span>
              <input
                type="text"
                name="image"
                placeholder="https://images.com/"
                required
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <img
              className={`${!showImage ? 'hidden' : 'block w-full'}`}
              src={post.image}
              alt={post.title}
            />
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
              <span>Tempo de Leitura:</span>
              <input
                type="number"
                name="read"
                placeholder="Insira o tempo estimado para a leitura"
                required
                onChange={(e) => setRead(e.target.value)}
                value={read}
              />
            </label>

            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                placeholder="Insira as tags separadas por vírgulas"
                required
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btnDark">Finalizar alterações</button>}
            {response.loading && <button className="btnDark" disabled>Aguarde...</button> }
            {response.error && <p className="error">{response.error}</p>}
            {formErrors && <p className="error">{formErrors}</p>}
          </form>
        </>
        )}
      </section>
    </section>
  );
}

export default EditPost;
