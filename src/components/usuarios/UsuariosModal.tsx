import React, { useState, useEffect } from "react";
import { evaluatePassword } from "../../modules/services/profile/password_evaluate";
import BaseService from "../../modules/services/base_service";
import { IAccount } from "../../interfaces/newAccount._interface";
import { StatusUser } from "../../enum/enum";
import { UsuariosModalProps } from "../../interfaces/Users/UsersModalProps";
import { validatePassword } from "../../modules/services/profile/passwordValidationService";
import { useSnackbar } from "notistack";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiX } from "react-icons/fi";

const UsuarioModal: React.FC<UsuariosModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    correo: "",
    rol: "",
    password: "",
    confirmPassword: "",
    estado: StatusUser.ACTIVO,
  });
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);



  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({
          id: user.id || "",
          nombre: user.name,
          correo: user.email,
          rol: user.rol || "",
          password: "",
          confirmPassword: "",
          estado: user.estatusUsuario || StatusUser.ACTIVO,
        });
      } else {
        setFormData({
          id: "",
          nombre: "",
          correo: "",
          rol: "",
          password: "",
          confirmPassword: "",
          estado: StatusUser.ACTIVO,
        });
      }
      setError(null);
      setPasswordMatch(null);
    }
  }, [isOpen, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === "password") {
        setPasswordStrength(evaluatePassword(value));
        setPasswordMatch(value === updatedData.confirmPassword);  
      }
      if (name === "confirmPassword") {
        setPasswordMatch(value === updatedData.password);
        if(value === updatedData.password){
          const {isValid, message} = validatePassword(updatedData.password);
          if(!isValid){
            setError(message); 
            setButtonDisabled(true);
          } else{
            setError(null); 
            setButtonDisabled(false);

          }
        }
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    const newUsuario: IAccount = {
      id: formData.id,
      name: formData.nombre,
      email: formData.correo,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      estatusUsuario: formData.estado,
      rol: formData.rol,
      isDeleted: false,
    };

    const baseService = new BaseService();

    try {
      let response;
      if (user) {
        response = await baseService.Put("/Account/UpdateUserData", newUsuario);
      } else {
        response = await baseService.Post("/Account/register", newUsuario);
      }

      if (response.success) {
        onSave(newUsuario);
        onClose();
      } else {
        setError(response.message!);
      }
    } catch (error) {
      console.error(error);
      setError("Error al guardar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {user ? "Editar Usuario" : "Agregar Usuario"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-200 rounded-full p-2"
          >
          <FiX className="text-2xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rol</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
            </select>
          </div>
          <div>
          <label className="block text-sm font-medium">Contraseña actual</label>
          <div className="relative">
          <input
          type={ showCurrentPassword ? "text" : "password" }
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full border rounded p-2"

          />
          <span
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer mr-4 text-gray-400 "
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <div className="relative">
            <input
              type={ showPassword ? "text" : "password" }
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <span
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer mr-4 text-gray-400 "
            onClick={() => setShowPassword(!showPassword)} 
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </span>
            </div>
            <p className="text-sm text-gray-500">Seguridad: {passwordStrength}</p>
          </div>
          <div>
            <label className="block text-sm font-medium">Confirmar Contraseña</label>
            <div className="relative">

            <input
              type={ showConfirmPassword ? "text" : "password" }
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <span
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer mr-4 text-gray-400 "
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} 
          </span>
            </div>
            {passwordMatch === false && (
              <p className="text-sm text-red-500">Las contraseñas no coinciden.</p>
            )}
          </div>
          {error && (
            <p
              className="text-sm text-red-500"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          )}
          

          <div className="flex justify-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            {buttonDisabled ? (
              <button
              type="submit"
              className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-blue-700"
              disabled
              
            >
            Guardar
            </button>
            ) : (
              <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
              
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            )}
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsuarioModal;
