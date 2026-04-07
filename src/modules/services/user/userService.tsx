import axios from "axios";
import { Api_Connection } from "../API/api_connection";
import {
  ResponseHelperModel,
  ResponseHelperModelSimple,
} from "../../../interfaces/responseHelper_T_interface";
import { IAccount } from "../../../interfaces/newAccount._interface";
import { MOCK_MODE, MOCK_USERS } from "../mockData";

const url = `${Api_Connection()}Account/`;

export default class UserService {
  // Obtener todos los usuarios
  async getUsers(): Promise<ResponseHelperModel<IAccount>> {
    try {
      if (MOCK_MODE) {
        return {
          success: true,
          message: "Usuarios cargados desde demo",
          data: MOCK_USERS.filter((u) => !u.isDeleted),
        };
      }

      const response = await axios.get(`${url}`);
      return response.data as ResponseHelperModel<IAccount>;
    } catch (error) {
      return {
        success: false,
        message: `Ha ocurrido un error al obtener los usuarios: ${error}`,
      };
    }
  }

  // Obtener usuario por ID
  async getUserById(id: string): Promise<ResponseHelperModelSimple<IAccount>> {
    try {
      if (MOCK_MODE) {
        const user = MOCK_USERS.find((u) => u.id === id && !u.isDeleted);
        return {
          success: !!user,
          message: user ? "Usuario encontrado" : "Usuario no encontrado",
          data: user,
        };
      }

      const response = await axios.get(`${url}GetUserById/${id}`);
      return response.data as ResponseHelperModelSimple<IAccount>;
    } catch (error) {
      return {
        success: false,
        message: `Ha ocurrido un error al obtener el usuario: ${error}`,
      };
    }
  }
}
