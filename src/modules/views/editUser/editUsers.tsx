import React, { useState } from "react";
import { evaluatePassword } from "../../services/profile/password_evaluate";
import { IUser } from "../../../interfaces/user_interface";

interface ProfileModalProps {
    isOpen: boolean;
    user: IUser;
    onClose: () => void;

}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        correo: user.email,
        password: "",
        confirmPassword: "",
    });
    const [passwordStrength, setPasswordStrength] = useState<string>("");
    const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            setPasswordStrength(evaluatePassword(value));
            setPasswordMatch(value === formData.confirmPassword);
        }
        if (name === "confirmPassword") {
            setPasswordMatch(value === formData.password);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Manejar el envío del formulario
        console.log("Datos enviados:", formData);
        onClose();
    };

    return (
        <div
            id="editUser-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Editar usuario</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8 flex items-center justify-center"
                    >
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 14 14"
                            aria-hidden="true"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6"
                            />
                        </svg>
                        <span className="sr-only">Cerrar modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {["name", "correo"].map((field) => (
                        <div key={field}>
                            <label
                                htmlFor={field}
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                {field === "name" ? "Nombre" : "Correo electrónico"}
                            </label>
                            <input
                                type={field === "correo" ? "email" : "text"}
                                name={field}
                                id={field}
                                value={formData[field as keyof typeof formData]}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                required
                            />
                        </div>
                    ))}
                    {["password", "confirmPassword"].map((field) => (
                        <div key={field}>
                            <label
                                htmlFor={field}
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                {field === "password" ? "Contraseña" : "Confirmar Contraseña"}
                            </label>
                            <input
                                type="password"
                                name={field}
                                id={field}
                                value={formData[field as keyof typeof formData]}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                            />
                            {field === "password" && (
                                <p className="mt-1 text-sm text-gray-600">
                                    Seguridad: {passwordStrength}
                                </p>
                            )}
                        </div>
                    ))}
                    {passwordMatch === false && (
                        <p className="text-sm text-red-600">Las contraseñas no coinciden</p>
                    )}
                    <div className="flex justify-center space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-lg px-5 py-2.5"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5"
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
