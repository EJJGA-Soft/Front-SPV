import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../../modules/views/login";
import Dashboard from "../../components/dashboard";
import AbarrotesHome from "../../modules/views/abarrotes/abarrotes";
import Compras from "../../components/abarrotes/compras";
import Productos from "../../components/Inventario/Productos";
import Usuarios from "../../components/usuarios/usuarios";
import VentasHome from "../../modules/views/ventas/ventashome";

export default function routes() {
    return (
      <BrowserRouter>
        <Routes>
          {/*<Route path="*"  element={<Page404/>}/> */}
          <Route path="/inicio" element={<Dashboard/>}/>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route index path="/login" element={<Login/>}/>
          <Route path="/abarrotes" element={<AbarrotesHome />} />
          <Route path="/registro-venta" element={<Compras/>} />
          <Route path="/historialventas" element={<VentasHome/>} />
          <Route path="/inventario" element={<Productos />} />
          <Route path="/usuarios" element={<Usuarios />}/>
        </Routes>
      </BrowserRouter>
    )
  } 