import { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { IUser } from "../../interfaces/user_interface";
import UserService from "../../modules/services/user/userService";
import EditProfileModal from "../../modules/views/editUser/editUsers";
import AddUserModal from "../../modules/views/addUser/addUsers";

const userService = new UserService();

export default function User() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

    // Funciones para manejar el modal de "Agregar Usuario"
    const handleOpenAddUserModal = () => {
        setIsAddUserModalOpen(true);
    };

    const handleCloseAddUserModal = () => {
        setIsAddUserModalOpen(false);
    };

    // Funciones para manejar el modal de "Editar Usuario"
    const handleOpenEditProfileModal = () => {
        setIsEditProfileModalOpen(true);
    };

    const handleCloseEditProfileModal = () => {
        setIsEditProfileModalOpen(false);
    };

    // Obtener usuarios desde el servicio
    async function GetUsers(): Promise<void> {
        try {
            const response = await userService.GetUsers();
            console.log("Datos recibidos del servicio:", response);

            if (response.success && Array.isArray(response.data)) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    }

    const getRole = (estatusUsuario: number) => {
        switch (estatusUsuario) {
            case 1:
                return "Administrador";
            case 0:
                return "Empleado";
            default:
                return "Invitado";
        }
    };

    useEffect(() => {
        GetUsers();
    }, []);

    return (
        <Layout>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Vista de Usuario</h1>
                        <button
                            onClick={handleOpenAddUserModal}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Agregar Usuario
                        </button>
                        {isAddUserModalOpen && (
                            <AddUserModal isOpen={isAddUserModalOpen} onClose={handleCloseAddUserModal} />
                        )}
                    </div>

                    {/* Tabla de Usuarios */}
                    <div style={{ flexGrow: 1, overflowY: "auto" }}>
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Nombre</th>
                                    <th className="py-3 px-6 text-left">Rol</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-center">Activo</th>
                                    <th className="py-3 px-6 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left">{user.name}</td>
                                            <td className="py-3 px-6 text-left">{getRole(user.activo)}</td>
                                            <td className="py-3 px-6 text-left">{user.email}</td>
                                            <td className="py-3 px-6 text-center">
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
                                            <td className="py-2 px-4 border-b text-center">
                                                <button
                                                    onClick={handleOpenEditProfileModal}
                                                    className="text-green-500"
                                                >
                                                    <img
                                                        src="src/assets/icons/edit_8524450.png"
                                                        alt="Editar"
                                                        className="h-7 w-7 mr-1"
                                                    />
                                                </button>
                                                {isEditProfileModalOpen && (
                                                    <EditProfileModal
                                                        isOpen={isEditProfileModalOpen}
                                                        onClose={handleCloseEditProfileModal}
                                                    />
                                                )}
                                                <button className="text-red-500 ml-2">
                                                    <img
                                                        src="src/assets/icons/square_14034334.png"
                                                        alt="Eliminar"
                                                        className="h-7 w-7 mr-1"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4">
                                            No hay usuarios disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
