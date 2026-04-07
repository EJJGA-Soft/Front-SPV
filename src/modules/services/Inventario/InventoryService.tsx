import axios from "axios";
import { Api_Connection } from "../API/api_connection";
import { ResponseHelperModel } from "../../../interfaces/responseHelper_T_interface";
import { Producto } from "../../../interfaces/Inventario/producto_interface";
import { MOCK_MODE, MOCK_PRODUCTS } from "../mockData";

const url = `${Api_Connection()}Productos/`;

export default class inventoryService {
  // Obtener todos los productos
  async getProducts(): Promise<ResponseHelperModel<Producto>> {
    try {
      // Usar mock data si está habilitado
      if (MOCK_MODE) {
        return {
          success: true,
          message: "Productos cargados desde demo",
          data: MOCK_PRODUCTS.filter((p) => !p.esBorrado),
        };
      }

      const response = await axios.get(`${url}`);
      return response.data as ResponseHelperModel<Producto>;
    } catch (error) {
      return {
        success: false,
        message: `Ha ocurrido un error al obtener los productos: ${error}`,
      };
    }
  }
}
