import axios from "axios";
import { Api_Connection } from "../API/api_connection";

const url = `${Api_Connection()}Proveedores/`;

export default class ProveedorService {
  async getProveedores() {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      return { success: false, message: `Ha ocurrido un error al obtener los proveedores: ${error}` };
    }
  }

  async getProveedorById(id: string) {
    try {
      const response = await axios.get(`${url}${id}`);
      return response.data;
    } catch (error) {
      return { success: false, message: `Ha ocurrido un error al obtener el proveedor: ${error}` };
    }
  }
}
