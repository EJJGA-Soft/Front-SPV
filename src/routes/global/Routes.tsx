import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../../modules/views/login";
import Dashboard from "../../components/dashboard";
import AbarrotesHome from "../../modules/views/abarrotes/abarrotes";
import Compras from "../../modules/views/abarrotes/compras";
import Productos from "../../components/Inventario/Productos";
import Usuarios from "../../components/usuarios/usuarios";
import VentasHome from "../../modules/views/ventas/ventashome";
import ProveedoresHome from "../../modules/views/proveedores/proveedoreshome";
import { UserStore } from "../../security/store/userStore";
import ProtectedRoute from "../../security/strategy/ProtectedRoutes";
import Page404 from "../../errors/views/page404";
import { ClearSession } from "../../components/log-out/log-out";

export default function AppRoutes() {
  const status = UserStore((state) => state.status);
  const isAuthenticated = status === "authenticated";

  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta para el error 404 */}
        <Route path="*" element={<Page404 />} />

        {/* Rutas públicas */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/inicio" replace /> : <Login />
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/inicio" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Rutas protegidas */}
        <Route
          path="/inicio"
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
              <Productos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Usuarios />
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

      <Route path="/cerrar-sesion" element={<ClearSession />} />

      </Routes>
    </BrowserRouter>
  );
}
