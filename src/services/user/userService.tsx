import axios from "axios";
import { Api_Connection } from "../API/api_connection";

const url = `${Api_Connection()}Account/`;

export default class UserService {
  async getUsers() {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      return { success: false, message: `Ha ocurrido un error al obtener los usuarios: ${error}` };
    }
  }

  async getUserById(id: string) {
    try {
      const response = await axios.get(`${url}GetUserById/${id}`);
      return response.data;
    } catch (error) {
      return { success: false, message: `Ha ocurrido un error al obtener el usuario: ${error}` };
    }
  }
}
