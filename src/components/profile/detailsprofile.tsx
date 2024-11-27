import React, { useState } from "react";
import { evaluatePassword } from "../../modules/services/profile/password_evaluate";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { UserStore } from "../../security/store/userStore";
import BaseService from '../../modules/services/base_service';
import NotificationService from "../../modules/services/mensajes/notification_service";
import { IUserObligatory } from '../../interfaces/user_interface';

interface ProfileModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const baseService = new BaseService();

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
    const { id, name, email } = UserStore.getState();

    const [formData, setFormData] = useState({
        id: id,
        name: name || "",
        email: email || "",
        currentPassword: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordStrength, setPasswordStrength] = useState<string | null>(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === "password") {
            setPasswordStrength(evaluatePassword(value));
        }

        if (name === "confirmPassword") {
            setPasswordsMatch(value === formData.password);
        }

        if (name === "password" && formData.confirmPassword) {
            setPasswordsMatch(value === formData.confirmPassword);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordsMatch) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const updateUser = await baseService.Put("/Account/UpdateUserData/", formData);

            if (updateUser.success) {
                const user = await baseService.GetSimple<IUserObligatory>(
                    `/Account/GetUserById/${id}`
                );

                if (formData.currentPassword != null) {
                    await baseService.Put("/Account/ChangePassword", {
                        id: id,
                        currentPassword: formData.currentPassword,
                        newPassword: formData.password,
                        confirmPassword: formData.confirmPassword
                    });
                }

                const name = user.data!.name;
                const email = user.data!.email;
                const status = "authenticated";
                const rol = user.data!.rol;

                if (user.success) {
                    UserStore.getState().setUser(
                        id,
                        name,
                        email,
                        status,
                        rol
                    );
                    NotificationService.showSuccess("¡Su perfil se actualizó con éxito!");
                    onClose();
                }
            } else {
                NotificationService.showError("Error al actualizar el perfil.");
            }
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            NotificationService.showError("Ocurrió un error inesperado.");
        }
    };

    const toggleShowPassword = (field: string) => {
        switch (field) {
            case "currentPassword":
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case "password":
                setShowNewPassword(!showNewPassword);
                break;
            case "confirmPassword":
                setShowConfirmPassword(!showConfirmPassword);
                break;
        }
    };

    return (
        <div
            id="profile-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-md bg-white max-h-full rounded-lg shadow-lg">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">Editar Perfil</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                        <FiX className="text-2xl" />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form className="p-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900">
                                Contraseña actual
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    name="currentPassword"
                                    id="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Ingresa tu contraseña actual"
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleShowPassword("currentPassword")}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                >
                                    {showCurrentPassword ? (
                                        <FiEyeOff className="text-gray-600" />
                                    ) : (
                                        <FiEye className="text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                Nueva contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Ingresa una nueva contraseña"
                                    disabled={!formData.currentPassword}
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleShowPassword("password")}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                >
                                    {showNewPassword ? (
                                        <FiEyeOff className="text-gray-600" />
                                    ) : (
                                        <FiEye className="text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {passwordStrength && (
                                <p className="mt-1 text-sm text-gray-600">Seguridad: {passwordStrength}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                                Confirmar nueva contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Confirma tu nueva contraseña"
                                    disabled={!formData.currentPassword}
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleShowPassword("confirmPassword")}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                >
                                    {showConfirmPassword ? (
                                        <FiEyeOff className="text-gray-600" />
                                    ) : (
                                        <FiEye className="text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {!passwordsMatch && (
                                <p className="mt-1 text-sm text-red-600">Las contraseñas no coinciden</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
