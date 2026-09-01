import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineLogout,
  HiOutlineCollection,
} from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import {
  FaCashRegister,
  FaFileInvoiceDollar,
  FaClipboardList,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import ProfileModal from "../profile/detailsprofile";
import { UserStore } from "@/global/userStore";

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
  { label: "Dashboard", icon: <LuLayoutDashboard />, link: "/dashboard" },
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
      { label: "Corte de caja", link: "/abarrotes", icon: <FaCashRegister /> },
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
  { label: "Categorias", icon: <HiOutlineCollection />, link: "/categorias" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Breadcrumb = ({ isSidebarFull }: { isSidebarFull: boolean }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace("-", " ");

  return (
    <nav
      className={`flex items-center justify-between text-gray-600 text-sm sm:text-base lg:text-lg py-3 px-4 lg:px-6 xl:px-8 bg-gray-50 border-b border-gray-300 transition-all duration-300 shadow-lg ${
        isSidebarFull ? "ml-10" : ""
      }`}
      aria-label="Breadcrumb"
    >
      <div className="flex items-center">
        <Link href="/dashboard" className="hover:text-gray-800">
          Dashboard
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
                <Link href={fullPath} className="hover:text-gray-800">
                  {capitalize(segment)}
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-gray-500">{currentDateTime.toLocaleString()}</div>
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

  const [OpenSubItems, setOpenSubItems] = useState(false);
  const toggleAbarrotesMenu = () => {
    setOpenSubItems((prev) => !prev);
  };

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
            ? "translate-x-0 w-60 bg-white lg:translate-x-0"
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
              className="absolute top-4 right-4 text-gray-700 text-2xl focus:outline-none"
              aria-label="Cerrar menú móvil"
              title="Cerrar menú móvil"
            >
              <FiX className="text-2xl" />
            </button>
          </div>
          <div
            className={`absolute flex flex-col items-center mt-2 mb-4 transition-transform duration-300 ${
              isSidebarFull || isMobileMenuOpen
                ? "translate-x-4"
                : "translate-x-0"
            }`}
          >
            <a href="/dashboard">
              <img
                src="/LOGO.svg"
                alt="Logotipo"
                className={`${isSidebarFull || isMobileMenuOpen ? "w-10 h-10" : "hidden"}`}
              />{" "}
            </a>
            {(isSidebarFull || isMobileMenuOpen) && (
              <span className="mt-2 text-gray-800 text-sm font-semibold text-center">
                PUNTO DE VENTA
              </span>
            )}
          </div>

          <div className="justify-between w-full lg:flex hidden">
            <span className="flex-1"></span>
            <button
              type="button"
              onClick={toggleSidebar}
              className="flex items-center justify-center w-12 h-12 text-gray-700 text-2xl focus:outline-none"
            >
              {isSidebarFull ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <ul
            className={`space-y-4 flex-grow ${isSidebarFull ? "pt-16" : isMobileMenuOpen ? "pt-24" : "pt-26"}`}
          >
            {menuItems
              .filter(
                (item) => !(role === "Empleado" && item.label === "Usuarios"),
              )
              .map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className={`flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100 ${
                      isSidebarFull ? "justify-start" : "justify-center"
                    }`}
                    onClick={
                      item.label === "Abarrotes"
                        ? toggleAbarrotesMenu
                        : undefined
                    }
                  >
                    <span className="text-xl">{item.icon}</span>
                    {(isSidebarFull || isMobileMenuOpen) && (
                      <div className="flex justify-between w-full ml-3">
                        <span className="ml-3">{item.label}</span>
                        {item.label === "Abarrotes" && (
                          <span className="text-xl group-hover">
                            {OpenSubItems ? <FiChevronDown /> : ""}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>

                  {/* Mapeo de subitems */}
                  {(isSidebarFull || isMobileMenuOpen) &&
                    item.label === "Abarrotes" &&
                    OpenSubItems &&
                    item.subItems &&
                    item.subItems.length > 0 && (
                      <ul className="ml-6 space-y-2 mt-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.link}
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

          <div className="mb-4 ml-[13px]">
            <Link
              href="/cerrar-sesion"
              className={`flex items-center w-full text-gray-700 rounded-lg hover:bg-gray-100 ${
                isSidebarFull ? "justify-start" : "justify-start"
              }`}
            >
              <HiOutlineLogout className="text-xl" />
              {(isSidebarFull || isMobileMenuOpen) && (
                <span className="ml-[10px]">Cerrar sesión</span>
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
        style={{
          marginLeft: isSidebarFull ? "13rem" : "",
          overflowX: "auto",
          overflowY: "hidden",
        }}
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
                src="/IUser.svg"
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
                      href="/cerrar-sesion"
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
           sm:pb-20
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
