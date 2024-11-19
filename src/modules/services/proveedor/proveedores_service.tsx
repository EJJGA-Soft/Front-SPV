import axios from "axios";
import { Proveedores } from "../../../interfaces/proveedores_interface";
import { Api_Connection } from "../API/api_connection";
import { IProveedores } from "../../../interfaces/proveedor_interface";
import { ResponseHelperModel } from "../../../interfaces/responseHelper_T_interface";

const url = `${Api_Connection()}Proveedor/`;

export default class ProveedorService {

  async getProveedores(): Promise<ResponseHelperModel<IProveedores>>{
    try {
        const response = await axios.get(`${url}`);
        return response.data as ResponseHelperModel<IProveedores>;
    } catch(error: unknown){
      return {
        success: false,
        message: "Ha ocurrido un error",
      }
    }
  }

  async AddProvService(proveedor: Proveedores): Promise<ResponseHelper> {
    try {
      const sendData = await axios.post(`${url}`, proveedor);
      const response = sendData.data as ResponseHelper;

      if (
        response.message === "Proveedor no encontrado" ||
        response.message === "Datos incorrectos"
      ) {
        return {
          success: false,
          message: response.message,
        };
      }

      return {
        success: true,
        message: "Proveedor agregado correctamente",
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Ocurrió un error al agregar el proveedor.",
      };
    }
  }
}
