import axios from "axios";
import { Api_Connection } from "../API/api_connection";

const url = `${Api_Connection()}Categorias/`;

export default class CategoriesService {
  async getCategories() {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      return { success: false, message: `Ha ocurrido un error al obtener las categorías: ${error}` };
    }
  }

  async getCategoryById(id: number) {
    try {
      const response = await axios.get(`${url}${id}`);
      return response.data;
    } catch (error) {
      return { success: false, message: `Ha ocurrido un error al obtener la categoría: ${error}` };
    }
  }
}
