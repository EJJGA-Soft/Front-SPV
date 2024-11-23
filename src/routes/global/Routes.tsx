import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../../modules/views/login";
import Dashboard from "../../components/dashboard";
import AbarrotesHome from "../../modules/views/abarrotes/abarrotes";
import Compras from "../../modules/views/abarrotes/compras";
import UsuariosHome from "../../modules/views/usuarios/usuarioshome";
import VentasHome from "../../modules/views/ventas/ventashome";
import ProveedoresHome from "../../modules/views/proveedores/proveedoreshome";
import { UserStore } from "../../security/store/userStore";
import ProtectedRoute from "../../security/strategy/ProtectedRoutes";
import Page404 from "../../errors/views/page404";
import { ClearSession } from "../../components/log-out/log-out";
import Inventario from "../../modules/views/Inventario/Inventario";
import Categorias from "../../modules/views/categorias/categorias";
import LandingPage from "../../modules/views/landingpage";

export default function AppRoutes() {
  const status = UserStore((state) => state.status);
  const isAuthenticated = status === "authenticated";

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para el error 404 */}
        <Route path="*" element={<Page404 />} />

        {/* Ruta para la página principal (Landing Page) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LandingPage />
            )
          }
        />

        {/* Ruta para la Landing Page */}
        <Route
          path="/landing"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Ruta para el Login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/abarrotes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AbarrotesHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registro-venta"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Compras />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detalle-ventas"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <VentasHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventario"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Inventario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UsuariosHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedores"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProveedoresHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Categorias />
            </ProtectedRoute>
          }
        />

        <Route path="/cerrar-sesion" element={<ClearSession />} />
      </Routes>
    </BrowserRouter>
  );
}
