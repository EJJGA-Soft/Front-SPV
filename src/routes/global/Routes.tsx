import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ejemplo from "../../modules/views/ejemplo";

export default function routes() {
    return (
      <BrowserRouter>
        <Routes>
          {/*<Route path="*"  element={<Page404/>}/> */}
          <Route path="/" element={<Ejemplo/>}/>
          
        </Routes>
      </BrowserRouter>
    )
  } 