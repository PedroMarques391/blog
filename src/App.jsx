import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import { AuthProvider } from './context/AuthContext';
import { useAuthentication } from './hooks/useAuthentication';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import Error from './pages/Error/Error';
import EditPost from './pages/EditPost/EditPost';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return (
      <section className="h-screen flex justify-center items-center w-full">
        <svg className="animate-spin h-16 w-h-16 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </section>
    );
  }

  return (
    <div>
      <AuthProvider value={{ user }}>
        <HashRouter basename="/">
          <NavBar />
          <div className="min-h-[60vh] mb-[5rem]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/" />} />
              <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </div>
          <Footer />
        </HashRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
