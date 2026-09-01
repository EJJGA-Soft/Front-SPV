'use client'
import { useEffect, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import UsuariosModal from "./UsuariosModal";
import ConfirmDeleteModal from "@/components/ModalDelete";
import LoadingTables from "@/components/loading/loadingtables";
import { IAccount } from "@/interfaces/newAccount._interface";
import BaseService from "@/services/base_service";

interface UsersTableProps {
  reload: boolean;
  setReload: (value: boolean) => void;
}

const baseService = new BaseService();

const UsuariosTable: React.FC<UsersTableProps> = ({ reload, setReload }) => {
  const [users, setUsers] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<IAccount | null>(null);
  const [userToEdit, setUserToEdit] = useState<IAccount | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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

  const getUsers = async () => {
    setLoading(true);
    const response = await baseService.Get<IAccount>("/Account");
    if (response.success) {
      setUsers(response.data as IAccount[]);
    }
    setLoading(false);
  };

  const HandleClose = () => {
    setUserToDelete(null);
    setOpenModalDelete(false);
  };

  const HandleConfirmDelete = () => {
    getUsers();
    setUserToDelete(null);
  };

  const HandleCloseEdit = () => {
    setOpenModalEdit(false);
    setUserToEdit(null);
  };

  const HandleSaveEdit = () => {
    getUsers();
    setUserToEdit(null);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (reload) {
      getUsers().then(() => setReload(false));
    }
  }, [reload, setReload]);

  return (
    <>
      {loading ? (
        <LoadingTables />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-white text-gray-700 text-center">
                <th className="p-4 text-xs sm:text-base">Nombre</th>
                <th className="p-4 text-xs sm:text-base">Rol</th>
                <th className="p-4 text-xs sm:text-base">Email</th>
                <th className="p-4 text-xs sm:text-base">Estado</th>
                <th className="p-4 text-xs sm:text-base">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No hay usuarios disponibles.
                  </td>
                </tr>
              ) : (
                currentUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 text-center text-sm"
                  >
                    <td className="p-4 break-all">{user.name}</td>
                    <td className="p-4 break-all">{user.rol}</td>
                    <td className="p-4 break-all">{user.email}</td>
                    <td className="p-4">
                      {user.isDeleted ? (
                        <span className="bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs">
                          Inactivo
                        </span>
                      ) : (
                        <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs">
                          Activo
                        </span>
                      )}
                    </td>
                    <td className="p-4 flex justify-center space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Editar usuario"
                        onClick={() => {
                          setOpenModalEdit(true);
                          setUserToEdit(user);
                        }}
                      >
                        <HiPencil className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        aria-label="Eliminar usuario"
                        onClick={() => {
                          setOpenModalDelete(true);
                          setUserToDelete(user);
                        }}
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-6 flex-wrap">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-sm md:text-base"
        >
          Antes
        </button>
        <span className="text-gray-700 text-xs sm:text-sm md:text-base my-2 sm:my-0">
          PÃ¡gina {currentPage} de {Math.ceil(users.length / usersPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * usersPerPage >= users.length}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 text-xs sm:text-sm md:text-base"
        >
          Siguiente
        </button>
      </div>

      {openModalDelete && (
        <ConfirmDeleteModal
          isOpen={openModalDelete}
          onClose={HandleClose}
          onConfirmDelete={HandleConfirmDelete}
          entity={"usuario"}
          itemEntity={userToDelete}
          deleteRoute={`/Account/DeleteUser/${userToDelete!.id}`}
        />
      )}

      {openModalEdit && (
        <UsuariosModal
          isOpen={openModalEdit}
          onClose={HandleCloseEdit}
          onSave={HandleSaveEdit}
          itemEntity={userToEdit!}
        />
      )}
    </>
  );
};

export default UsuariosTable;
