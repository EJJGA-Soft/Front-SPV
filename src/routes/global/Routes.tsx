import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../modules/views/login";
import Dashboard from "../../components/dashboard";
import CardComponent from "../../components/abarrotes/abarrotes";
import Compras from "../../components/abarrotes/compras";
import Productos from "../../components/Inventario/Productos";

export default function routes() {
    return (
      <BrowserRouter>
        <Routes>
          {/*<Route path="*"  element={<Page404/>}/> */}
          <Route path="/inicio" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/abarrotes" element={<CardComponent />} />
          <Route path="/registro-venta" element={<Compras/>} />
          <Route path="/inventario" element={<Productos />} />
          
        </Routes>
      </BrowserRouter>
    )
  } 