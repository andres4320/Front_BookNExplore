import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const links = [
  { text: "Iniciar Sesión", link: "/login", id: 1 },
  { text: "Crear Usuario", link: "/register", id: 2 },
  { text: "Favoritos", link: "/favorites", id: 3 },
  { text: "Mis reservas", link: "/misreservas", id: 4 },
  { text: "Cuenta", link: "/cuenta", id: 5 },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [windowDimension, setWindowDimension] = useState({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });

  const detectSize = () => {
    setWindowDimension({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    if (windowDimension.innerWidth >= 768 && isMenuOpen) {
      setIsMenuOpen(false);
    }

    return () => {
      window.addEventListener("resize", detectSize);
    };
  }, [windowDimension.innerWidth]);

  return (
    <div className={!isMenuOpen
      ? "flex items-center w-full px-4 bg-slate-500 justify-between"
      : "flex flex-col w-full items-center px-4 bg-slate-500 max-h-screen overflow-auto justify-center"
    }>
      <Link to="/" className="text-white font-semibold text-xl p-2">BookNExplore</Link>
      <div className={`flex ${isMenuOpen ? "flex-col items-center" : "items-center space-x-2"}`}>
        {windowDimension.innerWidth >= 768
          ? links.map(l => (
            <Link className="text-m text-white font-normal hover:font-semibold hover:text-yellow-300 duration-300 mx-2" to={l.link} key={l.id}>{l.text}</Link>
          ))
          : isMenuOpen && links.map(l => (
            <Link className="text-sm text-white font-normal hover:font-semibold hover:text-yellow-300 duration-300 mb-2" to={l.link} key={l.id}>{l.text}</Link>
          ))}
        {isMenuOpen && windowDimension.innerWidth < 768 ? (
          <AiOutlineClose cursor={"pointer"} size={24} color="#f2f2f2" onClick={() => setIsMenuOpen(false)} />
        ) : (windowDimension.innerWidth < 768 && (
          <AiOutlineMenu cursor={"pointer"} size={24} color="#f2f2f2" onClick={() => setIsMenuOpen(true)} />
        )
        )}
      </div>
    </div>
  );
}

export default Navbar;
