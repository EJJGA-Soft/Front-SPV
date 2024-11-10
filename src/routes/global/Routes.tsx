import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ejemplo from "../../modules/views/ejemplo";
import Login from "../../modules/views/login";

export default function routes() {
    return (
      <BrowserRouter>
        <Routes>
          {/*<Route path="*"  element={<Page404/>}/> */}
          <Route path="/inicio" element={<Ejemplo/>}/>
          <Route path="/login" element={<Login/>}/>
          
        </Routes>
      </BrowserRouter>
    )
  } 