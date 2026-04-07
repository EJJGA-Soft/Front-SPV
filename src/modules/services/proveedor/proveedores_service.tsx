import axios from "axios";
import { Api_Connection } from "../API/api_connection";
import {
  ResponseHelperModel,
  ResponseHelperModelSimple,
} from "../../../interfaces/responseHelper_T_interface";
import { IProveedores } from "../../../interfaces/Proveedores/proveedor_interface";
import { MOCK_MODE, MOCK_PROVIDERS } from "../mockData";

const url = `${Api_Connection()}Proveedores/`;

export default class ProveedorService {
  // Obtener todos los proveedores
  async getProveedores(): Promise<ResponseHelperModel<IProveedores>> {
    try {
      if (MOCK_MODE) {
        return {
          success: true,
          message: "Proveedores cargados desde demo",
          data: MOCK_PROVIDERS.filter((p) => !p.esBorrado),
        };
      }

      const response = await axios.get(`${url}`);
      return response.data as ResponseHelperModel<IProveedores>;
    } catch (error) {
      return {
        success: false,
        message: `Ha ocurrido un error al obtener los proveedores: ${error}`,
      };
    }
  }

  // Obtener proveedor por ID
  async getProveedorById(
    id: string,
  ): Promise<ResponseHelperModelSimple<IProveedores>> {
    try {
      if (MOCK_MODE) {
        const proveedor = MOCK_PROVIDERS.find(
          (p) => p.id === id && !p.esBorrado,
        );
        return {
          success: !!proveedor,
          message: proveedor
            ? "Proveedor encontrado"
            : "Proveedor no encontrado",
          data: proveedor,
        };
      }

      const response = await axios.get(`${url}${id}`);
      return response.data as ResponseHelperModelSimple<IProveedores>;
    } catch (error) {
      return {
        success: false,
        message: `Ha ocurrido un error al obtener el proveedor: ${error}`,
      };
    }
  }
}
