import { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import { IUser } from "../../../interfaces/user_interface";
import UserService from "../../services/user/userService";
import { ResponseHelperModel } from "../../../interfaces/responseHelper_T_interface";
import UsersTable from "../../../components/usuarios/UsuariosTable";
import UsuarioModal from '../../../components/usuarios/UsuariosModal';
import LoadingView from "../../../components/loading/loading";

const userService = new UserService();

export default function UsuariosHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersPerPage] = useState(7);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const handleSaveUser = (newUser: IUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    handleCloseModal();
  };

  const handleNextPage = () => {
    if (currentPage * usersPerPage < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  async function GetUsers() {
    try {
      setIsLoading(true);
      const response = await userService.GetUsers();

      if(response.success){
      setIsLoading(false);
      setUsers(response.data as IUser[]);
      return response as ResponseHelperModel<IUser>;
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  }

  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <Layout>
      <div className="bg-gray-100 sm:py-10 px-4 sm:px-6 lg:px-8 pt-6 pb-[95px] lg:mt-[-70px]">
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-base sm:text-lg">
        Usuarios</h1>
          <button
          className="font-semibold px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-base"
            onClick={handleOpenModal}
          >
            Agregar usuario
          </button>
        </div>

        
        <div className="overflow-x-auto max-h-[500px] sm:max-h-full">
       
          <UsersTable
            users={users}
            currentPage={currentPage}
            usersPerPage={usersPerPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            isLoading={isLoading}
          />
        
        </div>
        <div className="flex justify-between items-center mt-4 flex-wrap">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-sm md:text-base"
          >
            Anterior
          </button>

          <span className="text-gray-700 text-xs sm:text-sm md:text-base my-2 sm:my-0">
            Página {currentPage} de {Math.ceil(users.length / usersPerPage)}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage * usersPerPage >= users.length}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-sm md:text-base"
          >
            Siguiente
          </button>
        </div>

        {isModalOpen && <UsuarioModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveUser} />}

      </div>
    </Layout>
  );
}
