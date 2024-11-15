import { Link } from "react-router-dom";
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

export default function Layout({ children }: LayoutProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarFull, setIsSidebarFull] = useState<boolean>(() => {
    const savedState = localStorage.getItem("sidebar-state");
    try {
      return savedState ? JSON.parse(savedState) : false;
    } catch (error) {
      return error;
    }
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const Convert = (value: boolean): string => {
    return value.toString();
  };

  useEffect(() => {
    localStorage.setItem("sidebar-state", Convert(isSidebarFull));
  }, [isSidebarFull]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // Si la pantalla es pequeña (versión móvil), cerramos el sidebar
        setIsSidebarFull(false);
      } else {
        // Si la pantalla es grande, restauramos el estado del sidebar
        setIsSidebarFull(true);
      }
    };

    // Agregar el listener para el cambio de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Llamamos a handleResize al cargar la página para ajustarse al tamaño inicial
    handleResize();

    // Limpiamos el listener cuando el componente se desmonte
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
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 border-r border-gray-300 bg-white shadow-lg ${
          isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full"
        } lg:translate-x-0 lg:${isSidebarFull ? "w-64" : "w-16"}`}
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
              {isSidebarFull ? <FiX /> : <FiMenu className="mr-[10px]" />}
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
                <span className="ml-3">Cerrar sesión</span>
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
        style={{ marginLeft: isSidebarFull ? "11rem" : "" }}
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
          <div className="relative flex items-center ml-auto" ref={dropdownRef}>
            <p className="mr-4">¡Bienvenid@ usuario!</p>
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
                    Bonnie Green
                  </span>
                  <span className="block text-sm text-gray-500">
                    Administrador
                  </span>
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
        <main className="bg-gray-100 w-full max-w-full p-4 sm:p-10 pr-4 mx-auto h-auto overflow-y-auto custom-scrollbar sm:h-auto md:h-auto">
          {children}
        </main>
      </div>
    </div>
  );
}