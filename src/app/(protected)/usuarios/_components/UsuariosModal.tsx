'use client'
import React, { useState, useEffect } from "react";
import BaseService from "@/services/base_service";
import { IAccount } from "@/interfaces/newAccount._interface";
import { StatusUser } from "@/enum/enum";
import { useSnackbar } from "notistack";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import NotificationService from "@/services/mensajes/notification_service";

interface UsuariosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  itemEntity?: IAccount;
}

const evaluatePassword = (password: string): string => {
  if (password.length < 6) return "DÃ©bil";
  if (password.length < 10) return "Media";
  return "Fuerte";
};

const validatePassword = (password: string): { isValid: boolean; message: string } => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValid = minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  return {
    isValid,
    message: isValid
      ? ""
      : "La contraseÃ±a debe tener al menos 8 caracteres, una mayÃºscula, una minÃºscula, un nÃºmero y un carÃ¡cter especial.",
  };
};

const UsuariosModal: React.FC<UsuariosModalProps> = ({
  isOpen,
  onClose,
  onSave,
  itemEntity,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    correo: "",
    rol: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
    estado: StatusUser.ACTIVO,
  });
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const {} = useSnackbar();

  useEffect(() => {
    if (isOpen) {
      if (itemEntity) {
        setFormData({
          id: itemEntity.id || "",
          nombre: itemEntity.name,
          correo: itemEntity.email,
          rol: itemEntity.rol || "",
          password: "",
          confirmPassword: "",
          currentPassword: "",
          estado: itemEntity.estatusUsuario || StatusUser.ACTIVO,
        });
      } else {
        setFormData({
          id: "",
          nombre: "",
          correo: "",
          rol: "",
          password: "",
          confirmPassword: "",
          currentPassword: "",
          estado: StatusUser.ACTIVO,
        });
      }
      setError(null);
      setPasswordMatch(null);
    }
  }, [isOpen, itemEntity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
        if (value === updatedData.password) {
          const { isValid, message } = validatePassword(updatedData.password);
          if (!isValid) {
            setError(message);
            setButtonDisabled(true);
          } else {
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
      setError("Las contraseÃ±as no coinciden.");
      setLoading(false);
      return;
    }

    const newUsuario: IAccount = {
      id: formData.id,
      name: formData.nombre,
      email: formData.correo,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      currentPassword: formData.currentPassword,
      estatusUsuario: formData.estado,
      rol: formData.rol,
      isDeleted: false,
    };

    const baseService = new BaseService();

    try {
      let response;
      if (itemEntity) {
        response = await baseService.Put("/Account/UpdateUserData", newUsuario);
        if (newUsuario.currentPassword != null) {
          await baseService.Put("/Account/ChangePassword", {
            id: newUsuario.id,
            currentPassword: newUsuario.currentPassword,
            newPassword: newUsuario.password,
            confirmPassword: newUsuario.confirmPassword,
          });
          NotificationService.showSuccess("Â¡Se ha actualizado con exito al usuario!");
        }
      } else {
        response = await baseService.Post("/Account/register", newUsuario);
        NotificationService.showSuccess("Â¡Se ha creado con exito al usuario!");
      }

      if (response.success) {
        onSave();
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

  const isEditing = itemEntity && !formData.currentPassword;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {itemEntity ? "Editar Usuario" : "Agregar Usuario"}
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
            <label className="block text-sm font-medium">Correo ElectrÃ³nico</label>
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
          {itemEntity && (
            <div>
              <label className="block text-sm font-medium">ContraseÃ±a actual</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer mr-4 text-gray-400"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">ContraseÃ±a</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded p-2"
                disabled={!!isEditing}
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer mr-4 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <p className="text-sm text-gray-500">Seguridad: {passwordStrength}</p>
          </div>
          <div>
            <label className="block text-sm font-medium">Confirmar ContraseÃ±a</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded p-2"
                disabled={!!isEditing}
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer mr-4 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordMatch === false && (
              <p className="text-sm text-red-500">Las contraseÃ±as no coinciden</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value={StatusUser.ACTIVO}>Activo</option>
              <option value={StatusUser.INACTIVO}>Inactivo</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300"
            disabled={buttonDisabled || loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsuariosModal;
