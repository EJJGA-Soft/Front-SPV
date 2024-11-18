import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineLogout,
} from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";
import {
  FaCashRegister,
  FaFileInvoiceDollar,
  FaClipboardList,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import UserIcon from "../../assets/icons/IUser.svg";
import ProfileModal from "../profile/detailsprofile";
import { UserStore } from "../../security/store/userStore";

interface SubItem {
  label: string;
  link: string;
  icon: React.ReactNode;
}

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  link: string;
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  { label: "Inicio", icon: <HiOutlineHome />, link: "/inicio" },
  {
    label: "Abarrotes",
    icon: <HiOutlineShoppingCart />,
    link: "/abarrotes",
    subItems: [
      {
        label: "Registrar venta",
        link: "/registro-venta",
        icon: <FaClipboardList />,
      },
      { label: "Corte de caja", link: "/corte-caja", icon: <FaCashRegister /> },
      {
        label: "Detalle de ventas",
        link: "/detalle-ventas",
        icon: <FaFileInvoiceDollar />,
      },
    ],
  },
  { label: "Usuarios", icon: <HiOutlineUserGroup />, link: "/usuarios" },
  { label: "Inventario", icon: <HiOutlineShoppingBag />, link: "/inventario" },
  { label: "Proveedores", icon: <HiOutlineTruck />, link: "/proveedores" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Breadcrumb = ({ isSidebarFull }: { isSidebarFull: boolean }) => {
  const location = useLocation();
  const { pathname } = location;

  const pathSegments = pathname.split("/").filter((segment) => segment);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace("-", " ");

  return (
    <nav
      className={`flex items-center text-gray-600 text-sm sm:text-base lg:text-lg py-3 px-4 lg:px-6 xl:px-8 bg-gray-50 border-b border-gray-300 transition-all duration-300 shadow-lg ${
        isSidebarFull ? "ml-10" : ""
      }`}
      aria-label="Breadcrumb"
    >
      <Link to="/inicio" className="hover:text-gray-800">
        Inicio
      </Link>

      {pathSegments.map((segment, index) => {
        const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <div key={index} className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            {isLast ? (
              <span className="text-gray-500">{capitalize(segment)}</span>
            ) : (
              <Link to={fullPath} className="hover:text-gray-800">
                {capitalize(segment)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};


export default function Layout({ children }: LayoutProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarFull, setIsSidebarFull] = useState<boolean>(() => {
    const savedState = localStorage.getItem("sidebar-state");
    if (savedState === "true") {
      return true;
    } else if (savedState === "false") {
      return false;
    }

    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //Usuario Store.
  const username = UserStore((state) => state.name);
  const role = UserStore((state) => state.rol);

  const Convert = (value: boolean): string => {
    return value.toString();
  };

  useEffect(() => {
    localStorage.setItem("sidebar-state", Convert(isSidebarFull));
  }, [isSidebarFull]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarFull(false);
      } else {
        setIsSidebarFull(isSidebarFull);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarFull((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Backdrop para móvil */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 shadow-lg ${
          isMobileMenuOpen
            ? "translate-x-0 w-48 bg-white lg:translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } ${
          isSidebarFull
            ? "w-64 bg-white text-gray-800 border-gray-300 lg:w-64"
            : "w-20 bg-white text-gray-800 border-gray-300 lg:w-16"
        }`}
      >
        <div className="h-full flex flex-col justify-between px-4 py-6 bg-white">
          <div className="flex mb-6 lg:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="ml-auto text-gray-700 text-2xl focus:outline-none"
              aria-label="Cerrar menú móvil"
              title="Cerrar menú móvil"
            >
              <FiX />
            </button>
          </div>

          <div className="flex items-center justify-between w-full mb-4 lg:flex hidden">
            <span className="flex-1"></span>
            <button
              type="button"
              onClick={toggleSidebar}
              className="text-gray-700 text-2xl focus:outline-none"
            >
              {isSidebarFull ? <FiX /> : <FiMenu className="mr-[17px]" />}
            </button>
          </div>

          <ul className="space-y-4 flex-grow">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className={`flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100 ${
                    isSidebarFull ? "justify-start" : "justify-center"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {(isSidebarFull || isMobileMenuOpen) && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </Link>

                {/* Mapeo de subitems */}
                {(isSidebarFull || isMobileMenuOpen) &&
                  item.subItems &&
                  item.subItems.length > 0 && (
                    <ul className="ml-6 space-y-2 mt-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.link}
                            className="flex items-center w-full p-2 text-gray-600 rounded-lg hover:bg-gray-200"
                          >
                            <span className="text-xl">{subItem.icon}</span>
                            {(isSidebarFull || isMobileMenuOpen) && (
                              <span className="ml-3">{subItem.label}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>

          <div className="mb-4">
            <Link
              to="/cerrar-sesion"
              className={`flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100 ${
                isSidebarFull ? "justify-start" : "justify-center"
              }`}
            >
              <HiOutlineLogout className="text-xl" />
              {(isSidebarFull || isMobileMenuOpen) && (
                <span className="">Cerrar sesión</span>
              )}
            </Link>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div
        className={`flex-1 ${
          isMobileMenuOpen ? "ml-0" : "lg:ml-16"
        } scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300 ${
          isSidebarFull ? "ml-44" : ""
        }`}
        style={{ marginLeft: isSidebarFull ? "13rem" : "" }}
      >
        <nav className="bg-white border-b border-gray-300 p-4 flex items-center justify-between">
          {/* Botón de menú para dispositivos móviles */}
          <button onClick={toggleMobileMenu} className="text-2xl lg:hidden">
            {isMobileMenuOpen ? (
              <FiX aria-label="Cerrar menú móvil" title="Cerrar menú móvil" />
            ) : (
              <FiMenu aria-label="Abrir menú móvil" title="Abrir menú móvil" />
            )}
          </button>

          {/* Icono de usuario y dropdown para todas las pantallas */}
          {/* Icono de usuario y dropdown para todas las pantallas */}
          <div className="relative flex items-center ml-auto" ref={dropdownRef}>
            {/* Título de bienvenida, con ajuste responsivo */}
            <p className="mr-4 text-sm sm:text-base lg:text-lg">
              ¡Bienvenid@ {username}!
            </p>

            <button
              type="button"
              className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              onClick={toggleDropdown}
              aria-label="Abrir perfil"
              title="Abrir perfil"
            >
              <img
                className="w-8 h-8 rounded-full"
                src={UserIcon}
                alt="User Icon"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-10 w-48 z-50 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="px-4 py-2 border-b border-gray-200">
                  <span className="block text-sm font-semibold">
                    {username}
                  </span>
                  <span className="block text-sm text-gray-500">{role}</span>
                </div>
                <ul className="py-1">
                  <li
                    onClick={handleOpenModal}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Configurar perfil
                  </li>

                  <li>
                    <Link
                      to="/cerrar-sesion"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        {isModalOpen && <ProfileModal onClose={handleCloseModal} />}
        <div className="min-h-screen flex flex-col h-full">
          <Breadcrumb isSidebarFull={isSidebarFull} />
          <main
            className="
      bg-gray-100 
      w-full 
      mx-auto 
      sm:p-10 
      flex-grow 
      lg:p-10 
      xl:p-12 
      2xl:p-16 
      overflow-y-auto 
      custom-scrollbar
    "
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
