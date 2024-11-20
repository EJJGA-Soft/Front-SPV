import axios from "axios";
import { Proveedores } from "../../../interfaces/proveedores_interface";
import { Api_Connection } from "../API/api_connection";
import { IProveedores } from "../../../interfaces/Proveedores/proveedor_interface";
import { ResponseHelperModel } from "../../../interfaces/responseHelper_T_interface";

const url = `${Api_Connection()}Productos/ProductsWithProveedor`;

export default class ProveedorService {

  async getProveedoreswithProductos(): Promise<ResponseHelperModel<IProveedores[]>>{
    try {
        const response = await axios.get(`${url}`);
        return response.data as ResponseHelperModel<IProveedores[]>;
    } catch(error: unknown){
      return {
        success: false,
        message: "Ha ocurrido un error",
        data: [],
      };
    }
  }

  async AddProvService(proveedor: Proveedores): Promise<ResponseHelperModel> {
    try {
      const postUrl = `${Api_Connection()}Proveedor/`;
      const sendData = await axios.post(postUrl, proveedor);
      const response = sendData.data as ResponseHelperModel;

      if ( response.message === "Proveedor no encontrado" || response.message === "Datos incorrectos" ) 
        {
        return {success: false, message: response.message, };
      }

      return {
        success: true,
        message: "Proveedor agregado correctamente",
        data: response.data,
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Ocurrió un error al agregar el proveedor.";
      return { success: false, message: errorMessage };
    }
  }
  async DeleteProvService(proveedorId: string): Promise<ResponseHelperModel> {
    try {
      const deleteUrl = `${Api_Connection()}Proveedor/${proveedorId}`;
      const response = await axios.delete(deleteUrl);
      const { message } = response.data as ResponseHelperModel;
  
      if (message === "Proveedor no encontrado" || message === "No se pudo eliminar el proveedor") {
        return { success: false, message };
      }
  
      return { success: true, message: "Proveedor eliminado correctamente" };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Ocurrió un error al eliminar el proveedor.",
      };
    }

    
  }
  
}
