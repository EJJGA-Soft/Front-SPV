import axios from "axios";
import { Api_Connection } from "../API/api_connection";
import {
  ResponseHelperModel,
  ResponseHelperModelSimple,
} from "../../../interfaces/responseHelper_T_interface";
import { ICategoria } from "../../../interfaces/Inventario/categoria_interface";
import { MOCK_MODE, MOCK_CATEGORIES } from "../mockData";

const url = `${Api_Connection()}Categorias/`;

export default class CategoriesService {
  // Obtener todas las categorías
  async getCategories(): Promise<ResponseHelperModel<ICategoria>> {
    try {
      if (MOCK_MODE) {
        return {
          success: true,
          message: "Categorías cargadas desde demo",
          data: MOCK_CATEGORIES.filter((c) => !c.esBorrado),
        };
      }

      const response = await axios.get(`${url}`);
      return response.data as ResponseHelperModel<ICategoria>;
    } catch (error) {
      return {
        success: false,
        message: `Ha ocurrido un error al obtener las categorías: ${error}`,
      };
    }
  }

  // Obtener categoría por ID
  async getCategoryById(
    id: number,
  ): Promise<ResponseHelperModelSimple<ICategoria>> {
    try {
      if (MOCK_MODE) {
        const category = MOCK_CATEGORIES.find(
          (c) => c.id === id && !c.esBorrado,
        );
        return {
          success: !!category,
          message: category
            ? "Categoría encontrada"
            : "Categoría no encontrada",
          data: category,
        };
      }

      const response = await axios.get(`${url}${id}`);
      return response.data as ResponseHelperModelSimple<ICategoria>;
    } catch (error) {
      return {
        success: false,
        message: `Ha ocurrido un error al obtener la categoría: ${error}`,
      };
    }
  }
}
