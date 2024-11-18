import React, { useState } from "react";
import { UsersTableProps } from "../../interfaces/Users/UsersTableProps";
import UsuarioModal from "./UsuariosModal";
import { HiPencil, HiTrash } from 'react-icons/hi';
import { IUser } from "../../interfaces/user_interface";
import ConfirmDeleteModal from "../ModalDelete";

const UserTable: React.FC<UsersTableProps> = ({
    users,
    currentPage,
    usersPerPage,
    handleNextPage,
    handlePrevPage
}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<IUser | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState<IUser | null>(null);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const emptyRows = usersPerPage - currentUsers.length;

    const handleOpenModal = (user: IUser) => {
        setUsuarioSeleccionado(user);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setUsuarioSeleccionado(null);
    };

    const handleOpenDeleteModal = (user: IUser) => {
        setUsuarioAEliminar(user);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setUsuarioAEliminar(null);
    };

    const handleConfirmDelete = () => {
        if (usuarioAEliminar && usuarioAEliminar.id) {
            console.log("Usuario eliminado", usuarioAEliminar.id);
            users = users.filter(u=> u.id !== usuarioAEliminar.id);
            setDeleteModalOpen(false);
            setUsuarioAEliminar(null);
        } else {
            console.error("Error: Usuario no encontrado o no tiene un ID válido.");
        }
    };

    return (
        <div className="h-auto">
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
                    {currentUsers.map((user, index) => (
                        <tr key={index} className="border-t border-gray-200 text-center text-sm">
                            <td className="p-4 break-all">{user.name}</td>
                            <td className="p-4 break-all">{user.rol}</td>
                            <td className="p-4 break-all">{user.email}</td>
                            <td className="p-4 break-all">
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
                                    onClick={() => handleOpenModal(user)}
                                    className="text-blue-500 hover:text-blue-700"
                                    aria-label="Editar usuario"
                                >
                                    <HiPencil className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleOpenDeleteModal(user)}
                                    className="text-red-500 hover:text-red-700"
                                    aria-label="Eliminar usuario"
                                >
                                    <HiTrash className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {emptyRows > 0 &&
                        Array.from({ length: emptyRows }).map((_, index) => (
                            <tr key={`empty-${index}`} className="border-t border-gray-200 text-center">
                                <td className="p-4">&nbsp;</td>
                                <td className="p-4">&nbsp;</td>
                                <td className="p-4">&nbsp;</td>
                                <td className="p-4">&nbsp;</td>
                                <td className="p-4">&nbsp;</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {usuarioSeleccionado && isModalOpen && (
                <UsuarioModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    user={usuarioSeleccionado}
                />
            )}

            {usuarioAEliminar && isDeleteModalOpen && (
                <ConfirmDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    onConfirmDelete={handleConfirmDelete}
                    entity="usuario"
                    itemEntity={usuarioAEliminar.name}
                />
            )}
        </div>
    );
};

export default UserTable;
