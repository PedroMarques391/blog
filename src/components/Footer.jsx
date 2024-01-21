import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';

import { Logo } from './Logo';

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center text-white bg-black">
      <section className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-xl my-5">Veja Também</h1>
        <ul className="flex gap-5">
          <li>
            <a
              target="_blank"
              className="text-white text-lg"
              href="https://pedromarques391.github.io/portfolio/"
              rel="noreferrer"
            >
              Meu Portifólio
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="text-white text-lg"
              href="https://pedromarques391.github.io/carStore/#/"
              rel="noreferrer"
            >
              Último Projeto
            </a>
          </li>
        </ul>
      </section>
      <section className="flex flex-col items-center justify-center my-2 w-full md:w-1/2">
        <h1 className="font-bold text-xl my-5">Links Úteis</h1>
        <ul className="flex justify-around items-center text-white p-2 w-full">
          <li>
            <a
              target="_blank"
              className="text-white text-4xl"
              href="https://www.instagram.com/pedromarques.py/"
              rel="noreferrer"
            >
              <FaInstagramSquare />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="text-white text-4xl"
              href="https://github.com/PedroMarques391"
              rel="noreferrer"
            >
              <FaGithubSquare />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="text-white text-4xl"
              href="https://www.linkedin.com/in/pedromarques391/"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>

        </ul>
      </section>
      <Logo />
      <p className="mt-5">&copy;2023</p>
    </footer>
  );
}

export default Footer;
