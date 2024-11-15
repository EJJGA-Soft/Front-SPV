import React, { useState } from "react";
import { evaluatePassword } from "../../modules/services/profile/password_evaluate";

interface ProfileModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({onClose }) => {
    const [name, setName] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordStrength, setPasswordStrength] = useState<string>("");
    const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(evaluatePassword(newPassword));
        setPasswordMatch(confirmPassword === newPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordMatch(password === newConfirmPassword);
    };

    return (
        <div id="profile-modal" tabIndex={-1} aria-hidden="true"
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
                        <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form className="p-4">
                    <div className="grid gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder=""
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
                            <input
                                type="email"
                                name="correo"
                                id="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder=""
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Ingresa una nueva contraseña"
                                required
                            />
                            <p className="mt-1 text-sm text-gray-600">
                                Seguridad: {passwordStrength}
                            </p>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirmar Contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Confirma tu contraseña"
                                required
                            />
                            {passwordMatch === false && (
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
