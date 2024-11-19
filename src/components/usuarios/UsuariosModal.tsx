import React, { useState, useEffect } from "react";
import { evaluatePassword } from "../../modules/services/profile/password_evaluate";
import UserService from "../../modules/services/user/userService";
import { UsuariosModalProps } from "../../interfaces/Users/UsersModalProps";
import { Usuario } from "../../interfaces/usuario_interface";

const UsuarioModal: React.FC<UsuarioModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [estado, setEstado] = useState("Activo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setRol(user.rol); 
        setEstado(user.estado || "Activo");
        setPassword(""); 
        setConfirmPassword("");
      } else {
        setName("");
        setEmail("");
        setRol("");
        setEstado("Activo");
        setPassword("");
        setConfirmPassword("");
      }
      setError(null);
      setPasswordMatch(null);
    }
  }, [isOpen, user]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "nombre") setName(value);
    if (name === "correo") setEmail(value);
    if (name === "rol") setRol(value);
    if (name === "password") {
      setPassword(value);
      setPasswordStrength(evaluatePassword(value));
      setPasswordMatch(value === confirmPassword);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setPasswordMatch(value === password);
    }
    if (name === "estado") setEstado(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    const newUsuario: Usuario = {
      nombre: name,
      email: email,
      password: password || undefined, 
      estado: estado,
      rol: rol,
    };

    const usuarioService = new UserService();

    try {
      const response = user
        ? await usuarioService.UpdateUsuarioService(user.id, newUsuario)
        : await usuarioService.AddUsuarioService(newUsuario);

      if (response.success) {
        onSave(newUsuario);
        onClose();
      } else {
        setError(response.message);
      }
    } catch (error) {
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
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={name}
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
              value={email}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rol</label>
            <select
              name="rol"
              value={rol}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="Administrativo">Administrativo</option>
              <option value="Empleado">Empleado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            <p className="text-sm text-gray-500">Seguridad: {passwordStrength}</p>
          </div>
          <div>
            <label className="block text-sm font-medium">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {passwordMatch === false && (
              <p className="text-sm text-red-500">Las contraseñas no coinciden.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="estado"
              value={estado}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsuarioModal;
