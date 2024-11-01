import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { useState } from "react";

interface SubItem {
  label: string;
  link: string;
}

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  link?: string;
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Inicio",
    icon: <HiOutlineHome />,
    link: "#",
  },
];

export default function Layout() {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSubmenu = (label: string) => {
    setIsOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-300 bg-white">
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-200 whitespace-nowrap"
                  onClick={() => toggleSubmenu(item.label)}
                >
                  <span className="flex ml-16 text-xl">{item.icon}</span>
                  <span className="flex ml-3">{item.label}</span>
                  {item.subItems && (
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  )}
                </button>
                {item.subItems && isOpen[item.label] && (
                  <ul className="py-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.link}
                          className="flex items-center w-full p-2 text-gray-700 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex-1 ml-64 flex flex-col">
        <nav className="bg-white border-b border-gray-300">
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <div className="ml-auto relative">
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
                      name@flowbite.com
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-1 p-6 bg-gray-100">
          <h1>¡Bienvenido al contenido!</h1>
        </main>
      </div>
    </div>
  );
}
