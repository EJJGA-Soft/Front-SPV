import React, { useState } from "react";
import {
  RiCheckboxBlankCircleFill,
  RiMenu3Fill,
  RiCloseLine,
} from "react-icons/ri";
import Login from "../../modules/views/login";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowMenu(false); 
  };
  const enviaralLogin = () =>{
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between xl:justify-start w-full py-4 px-8 h-[10vh] z-50">
      <div className="xl:w-1/6 text-center -mt-4">
        <a href="#" className="text-2xl font-bold relative p-1 bg-white">
          POS-VENTAS
          <RiCheckboxBlankCircleFill className="absolute -left-3 -bottom-3 text-primary -z-10" />
        </a>
      </div>

      <nav
        className={`fixed bg-white w-[80%] md:w-[40%] xl:w-full h-full ${
          showMenu ? "left-0" : "-left-full"
        } top-0 xl:static flex-1 flex flex-col xl:flex-row items-center justify-center gap-10 transition-all duration-500 z-50`}
      >
        
        <button
          onClick={() => handleScroll("works")}
          className="text-lg font-normal text-gray-800 hover:font-bold hover:text-primary transition-all duration-300 ease-in-out"
        >
          Servicios
        </button>
       
        <button
        onClick={enviaralLogin}
        className="text-lg font-normal text-gray-800 hover:font-bold hover:text-primary transition-all duration-300 ease-in-out"
        >
          Iniciar sesión
        </button>
      </nav>

      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden text-2xl p-2"
        aria-label="Toggle Menu"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
    </header>
  );
};

export default Header;
