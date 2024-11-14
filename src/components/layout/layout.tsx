import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineShoppingCart, HiOutlineUserGroup, HiOutlineShoppingBag, HiOutlineTruck, HiOutlineLogout } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";
import { FaCashRegister, FaFileInvoiceDollar, FaClipboardList } from "react-icons/fa";
import { useState } from "react";

interface SubItem {
  label: string;
  link: string;
}

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  link: string;
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Inicio",
    icon: <HiOutlineHome />,
    link: "/inicio",
  },
  {
    label: "Abarrotes",
    icon: <HiOutlineShoppingCart />,
    link: "/abarrotes",
    subItems: [
      { label: "Registrar venta", link: "/registro-venta", icon: <FaClipboardList /> },
      { label: "Corte de caja", link: "/corte-caja", icon: <FaCashRegister /> },
      { label: "Detalle de ventas", link: "/detalle-ventas", icon: <FaFileInvoiceDollar /> },
    ],
  },
  {
    label: "Usuarios",
    icon: <HiOutlineUserGroup />,
    link: "/usuarios",
  },
  {
    label: "Inventario",
    icon: <HiOutlineShoppingBag />,
    link: "/inventario",
  },
  {
    label: "Proveedores",
    icon: <HiOutlineTruck />,
    link: "/proveedores",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarFull, setIsSidebarFull] = useState(false);

  const toggleSubmenu = (label: string) => {
    setIsOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarFull((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 ${isSidebarFull ? "w-64" : "w-16"} h-screen transition-all duration-300 border-r border-gray-300 bg-white`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex items-center w-full p-2 mb-8 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            {isSidebarFull ? (
              <FiX className="ml-auto text-2xl" />
            ) : (
              <FiMenu className="ml-auto text-2xl" />
            )}
          </button>

          <ul className="space-y-4 mb-4 py-12 font-medium items-center">
            {menuItems.map((item, index) => (
              <li key={index}>
                {/* Envolver en Link para navegación */}
                <Link
                  to={item.link}
                  className={`flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer ${isSidebarFull ? "justify-start" : "justify-center"}`}
                  onClick={() => toggleSubmenu(item.label)} // Desplegar el submenú al hacer clic
                >
                  <span className="text-xl">{item.icon}</span>
                  {isSidebarFull && <span className="ml-3">{item.label}</span>}
                </Link>

                {/* Submenu */}
                {item.subItems && isOpen[item.label] && isSidebarFull && (
                  <ul className="pl-6 py-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.link}
                          className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                          <span className="text-lg">{subItem.icon}</span>
                          <span className="ml-2">{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Cierre de sesión en la parte inferior */}
          <div className="mt-auto">
            <Link
              to="/cerrar-sesion"
              className={`flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer ${isSidebarFull ? "justify-start" : "justify-center"}`}
            >
              <span className="text-xl">
                <HiOutlineLogout />
              </span>
              {isSidebarFull && <span className="ml-3">Cerrar sesión</span>}
            </Link>
          </div>
        </div>
      </aside>

      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarFull ? "ml-64" : "ml-16"} flex flex-col`}>
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-300">
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">
            <div className="ml-auto flex items-center space-x-4">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleDropdown}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="user photo"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:bg-gray-700">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      Bonnie Green
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      Administrador
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Configurar perfil
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Cerrar sesión
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
