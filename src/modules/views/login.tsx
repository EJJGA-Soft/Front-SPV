import { useState } from "react";
import AccountService from "../services/login/account_services";
import { INewAccount } from "../../interfaces/newAccount._interface";
import { useNavigate } from "react-router-dom";
import { StatusUser } from "../../enum/enum";

const accountService = new AccountService();

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const toggleView = () => {
    setIsRegister(!isRegister);
  };

  async function RegisterUserAccount() {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const newAccount: INewAccount = {
      name,
      email,
      password,
      confirmPassword,
      rol: "Usuario",
      estatusUsuario: StatusUser.ACTIVO,
    };

    const response = await accountService.registerAccount(newAccount);

    if (response.success) {
      alert("Registro exitoso");
      navigate("/inicio");
    } else {
      alert("Ocurrió un error: " + response.message);
    }
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    RegisterUserAccount();
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('/src/assets/images/login/background-login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-white/90 p-8 rounded-lg shadow-lg max-w-sm w-full transform transition-transform duration-700"
        style={{
          transform: isRegister ? "rotateY(180deg)" : "rotateY(0deg)",
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Vista de Iniciar Sesión */}
        {!isRegister && (
          <div className="w-full" style={{ backfaceVisibility: "hidden" }}>
            <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Entrar
              </button>
            </form>
            <div className="mt-4 w-full text-center font-bold py-2">
              <span className="text-black">No tienes cuenta? </span>
              <button
                onClick={toggleView}
                className="text-blue-600 hover:underline"
              >
                Regístrate
              </button>
            </div>
          </div>
        )}

        {/* Vista de Registrarse */}
        {isRegister && (
          <div className="w-full" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <h2 className="text-2xl font-bold text-center mb-6">Registrarse</h2>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Registrarse
              </button>
            </form>
            <button
              onClick={toggleView}
              className="mt-4 w-full text-green-600 font-bold py-2 rounded-lg"
            >
              Volver a Iniciar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
