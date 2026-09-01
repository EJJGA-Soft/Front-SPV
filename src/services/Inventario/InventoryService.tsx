import axios from "axios";
import { Api_Connection } from "../API/api_connection";
import { ResponseHelperModel } from "../../../interfaces/responseHelper_T_interface";
import { Producto } from "../../../interfaces/Inventario/producto_interface";

const url = `${Api_Connection()}Productos/`;

export default class inventoryService {
  // Obtener todos los productos
  async getProducts(): ResponseHelperModel<Producto> {
    try {
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
