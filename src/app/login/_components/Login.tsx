'use client'
import { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import AccountService from "@/services/login/account_services";
import { useRouter } from "next/navigation";
import LoadingView from "@/components/loading/loading";

const accountService = new AccountService();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await accountService.Login({ email, password });
      if (response?.success) {
        router.push("/dashboard");
      } else {
        setError("Correo o contraseña incorrectos.");
      }
    } catch {
      setError("Error de conexión. Inténtalo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {isLoading && <LoadingView />}

      {/* Panel izquierdo — blanco */}
      <div className="w-full lg:w-[45%] flex flex-col bg-white px-10 sm:px-16 py-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-auto">
          <img src="/LOGO.svg" alt="Logo" className="w-8 h-8" />
          <span className="font-semibold text-gray-800 text-sm">Punto de Venta</span>
        </div>

        {/* Formulario centrado */}
        <div className="flex-1 flex flex-col justify-center max-w-[340px] w-full mx-auto py-12">
          <p className="text-sm text-gray-400 mb-1">Bienvenido de vuelta</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Inicia sesión</h1>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative group">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
                className="floating-label-input peer w-full h-14 px-4 pt-3 pb-1 border border-gray-300 rounded-lg text-gray-900 text-sm bg-white
                  focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none bg-white px-0.5
                  transition-all duration-200
                  peer-focus:-top-0 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-blue-500 peer-focus:left-3.5
                  peer-[&:not(:placeholder-shown)]:-top-0 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:left-3.5 peer-[&:not(:placeholder-shown)]:text-gray-500"
              >
                E-mail
              </label>
              <FiMail
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-400 transition-colors"
                size={17}
              />
            </div>

            {/* Contraseña */}
            <div className="relative group">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
                className="floating-label-input peer w-full h-14 px-4 pt-3 pb-1 border border-gray-300 rounded-lg text-gray-900 text-sm bg-white
                  focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none bg-white px-0.5
                  transition-all duration-200
                  peer-focus:-top-0 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-blue-500 peer-focus:left-3.5
                  peer-[&:not(:placeholder-shown)]:-top-0 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:left-3.5 peer-[&:not(:placeholder-shown)]:text-gray-500"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {isPasswordVisible ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                <span>⚠</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-1 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 text-white font-semibold text-sm transition-all duration-150"
            >
              {isLoading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <button
            onClick={() => router.push("/")}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>

      {/* Panel derecho — ilustración POS */}
      <div
        className="hidden lg:block flex-1"
        style={{
          backgroundImage: "url('/login-illustration.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
