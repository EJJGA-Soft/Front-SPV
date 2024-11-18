import axios from "axios";
import { Proveedores } from "../../../interfaces/proveedores_interface";
import { ResponseHelper } from "../../../interfaces/responseHelper_interface";
import { Api_Connection } from "../API/api_connection";

const url = `${Api_Connection()}Proveedor/`;

export default class ProveedorService {

  async getProveedores(): Promise<ResponseHelper>{
    try {
        const response = await axios.get(`${url}`);
        const data = response.data as ResponseHelper;

        if(
            data.message === "Proveedores no encontrados" ||
            data.message === "Error en la consulta"
        ) {
            return {
                success: false,
                message: data.message,
            };
        }

        return {
            success: true,
            message: "Proveedores obtenidos correctamente",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message:
            error.response?.data?.message || "Ocurrio un error al obtener los proveedores",
        };
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
