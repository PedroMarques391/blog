import { useEffect, useState } from 'react';
import { IoIosLogOut, IoMdClose } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { CiMenuFries } from 'react-icons/ci';
import { useAuthentication } from '../hooks/useAuthentication';
import { useAuthValue } from '../context/AuthContext';
import { Logo } from './Logo';

function NavBar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => (window.scrollY > 60 ? setScroll(true) : setScroll(false)));
  });

  return (
    <>
      <nav className={`${!isOpen ? 'shadow-lg shadow-slate-500' : 'shadow-none'} ${scroll ? 'h-24' : 'h-20'} sticky top-0 w-full flex  justify-between items-center py-2 px-8 bg-black z-10  selection:select-none transition-all duration-500 ease-out`}>
        <NavLink to="/" className="text-lg text-white md:ml-10">
          <Logo />
        </NavLink>
        {!isOpen
          ? (
            <CiMenuFries
              className="text-3xl text-white md:hidden"
              onClick={handleOpen}
            />
          )
          : (
            <IoMdClose
              className="text-3xl text-white hover:text-red-600 transition-all duration-1000 md:hidden z-50"
              onClick={handleOpen}
            />
          )}
        <ul className="hidden md:flex h-14 items-center ">
          <li className="mr-2">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-neutral-400 py-[0.6em] px-[0.6em]' : 'py-[0.6em] px-[0.6em] text-white')}>
              Home
            </NavLink>
          </li>
          {!user && (
          <li className="mr-2">
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'text-neutral-400 py-[0.6em] px-[0.6em]' : 'py-[0.6em] px-[0.6em] text-white')}>
              Log-in
            </NavLink>
          </li>
          )}
          {user && (
          <>
            <li className="mr-2">
              <NavLink to="/posts/create" className={({ isActive }) => (isActive ? 'text-neutral-400 py-[0.6em] px-[0.6em]' : 'py-[0.6em] px-[0.6em] text-white')}>
                Novo Post
              </NavLink>
            </li>
            <li className="mr-2">
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'text-neutral-400 py-[0.6em] px-[0.6em]' : 'py-[0.6em] px-[0.6em] text-white')}>
                Dashboard
              </NavLink>
            </li>
          </>
          )}
          {user && (
          <li className="mr-2 flex justify-center items-center">
            <button onClick={logout}>
              <IoIosLogOut className="text-2xl text-white" />
            </button>
          </li>
          )}
        </ul>

      </nav>
      <nav
        className={`${!isOpen ? '-top-[600px]' : 'top-0'} fixed w-full text-center shadow-lg shadow-slate-500 bg-black selection:select-none transition-all duration-1000 ease-out`}
      >
        <ul className="md:hidden items-center flex-col pt-10 mt-10">
          <li className="my-5 text-xl">
            <NavLink
              onClick={handleOpen}
              to="/"
              className={({ isActive }) => (isActive ? 'text-neutral-400 py-[0.6em] px-[0.6em]' : 'py-[0.6em] px-[0.6em] text-white')}
            >
              Home
            </NavLink>
          </li>
          {!user && (
          <li className="my-5 text-xl">
            <NavLink
              onClick={handleOpen}
              to="/login"
              className={({ isActive }) => (isActive ? 'text-neutral-400 py-[0.6em] px-[0.6em]' : 'py-[0.6em] px-[0.6em] text-white')}
            >
              Log-in
            </NavLink>
          </li>
          )}
          {user && (
          <>
            <li className="my-5 text-xl">
              <NavLink
                onClick={handleOpen}
                to="/posts/create"
                className={({ isActive }) => (isActive ? 'text-neutral-400 py-[0.6em] px-[0.6em]' : 'py-[0.6em] px-[0.6em] text-white')}
              >
                Novo Post
              </NavLink>
            </li>
            <li className="my-5 text-xl">
              <NavLink
                onClick={handleOpen}
                to="/dashboard"
                className={({ isActive }) => (isActive ? 'text-neutral-400 py-[0.6em] px-[0.6em]' : 'py-[0.6em] px-[0.6em] text-white')}
              >
                Dashboard
              </NavLink>
            </li>
          </>
          )}
          {user && (
          <li className="my-5 text-xl flex justify-center items-center">
            <button onClick={logout}>
              <IoIosLogOut className="text-2xl text-white" />
            </button>
          </li>
          )}
        </ul>
        ;
      </nav>
    </>

  );
}

export default NavBar;
