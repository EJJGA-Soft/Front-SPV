import { useState } from "react";
import { FiHome, FiEye, FiEyeOff } from "react-icons/fi";
import AccountService from "../services/login/account_services";
import { MOCK_MODE, MOCK_USERS } from "../services/mockData";
import { useNavigate } from "react-router-dom";
import { ResponseHelper } from "../../interfaces/responseHelper_interface";
import LoadingView from "../../components/loading/loading";

const accountService = new AccountService();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSelectMockUser = (selectedEmail: string): void => {
    const mockUser = MOCK_USERS.find((user) => user.email === selectedEmail);
    if (mockUser) {
      setEmail(mockUser.email);
      setPassword(mockUser.password);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await accountService.Login({ email, password });
      const results = response as ResponseHelper;
      if (results.success) {
        navigate("/dashboard");
      } else {
        alert(
          "El usuario no existe, o la contraseña es incorrecta. Comprueba tu cuenta.",
        );
      }
    } catch (error) {
      alert(
        "Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde: " +
          error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isLoading && <LoadingView />}

      <div className="bg-white/90 rounded-[30px] shadow-lg w-full max-w-[95%] sm:max-w-[400px] md:max-w-[500px] min-h-[500px] flex flex-col justify-center p-6 sm:p-8 md:p-10">
        <img
          className="mx-auto w-20 h-auto sm:w-24 mb-6 sm:mb-10"
          src="/LOGO.svg"
          alt="LOGO"
        />

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-3">
          Inicia sesión con tu cuenta
        </h2>
        <p className="text-center mb-4 text-gray-600">
          Bienvenido al sistema de abarrotes
        </p>

        <form
          onSubmit={handleLoginSubmit}
          className="space-y-4 pb-[60px] sm:pb-[80px]"
        >
          {MOCK_MODE && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona un usuario de demo
              </label>
              <select
                onChange={(e) => handleSelectMockUser(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                defaultValue=""
              >
                <option value="">-- Selecciona un usuario --</option>
                {MOCK_USERS.map((user) => (
                  <option key={user.id} value={user.email}>
                    {user.name} ({user.rol})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Contraseña de demo: demo123
              </p>
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Ingresar correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"} // Cambia el tipo dinámicamente
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors mb-6 sm:mb-[30px]"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Botón para volver al inicio */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors font-semibold mt-4"
        >
          <FiHome className="mr-2 text-2xl" />
          Volver al inicio
        </button>
      </div>
      <footer className="absolute bottom-0 w-full text-center text-gray-100 text-sm py-4">
        <p>&copy; 2024 Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
