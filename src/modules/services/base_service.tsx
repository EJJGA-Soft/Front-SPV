import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  ResponseHelperModel,
  ResponseHelperModelSimple,
} from "../../interfaces/responseHelper_T_interface";
import { Api_Connection } from "./API/api_connection";
import {
  MOCK_MODE,
  MOCK_USERS,
  MOCK_PRODUCTS,
  MOCK_PROVIDERS,
  MOCK_CATEGORIES,
  MOCK_VENTAS,
  MOCK_VENTA_PRODUCTOS,
  getMockVentaProductosByVentaId,
} from "./mockData";

export default class BaseService {
  private _api: AxiosInstance;

  constructor() {
    const baseURL = Api_Connection();
    this._api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Métodos genéricos para solicitudes HTTP (Get, Post, Put, Delete). Created: FrankRojas31.

  async Get<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<ResponseHelperModel<T>> {
    try {
      // Soportar endpoints comunes en modo mock
      if (MOCK_MODE) {
        const mockResponse = this.getMockDataForEndpoint<T>(endpoint);
        if (mockResponse) {
          return mockResponse;
        }
      }

      const response = await this._api.get<ResponseHelperModel<T>>(endpoint, {
        params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private getMockDataForEndpoint<T>(
    endpoint: string,
  ): ResponseHelperModel<T> | null {
    // Mapear endpoints a datos mock
    if (endpoint.includes("/Account/AllUsersWithRole")) {
      return {
        success: true,
        message: "Usuarios cargados desde demo",
        data: MOCK_USERS.filter((u) => !u.isDeleted) as any[],
      };
    }
    if (endpoint.includes("/Productos/ProductsWithProveedor")) {
      return {
        success: true,
        message: "Proveedores cargados desde demo",
        data: MOCK_PROVIDERS.filter((p) => !p.esBorrado) as any[],
      };
    }
    if (endpoint.includes("Categorias") || endpoint === "/Categorias/") {
      return {
        success: true,
        message: "Categorías cargadas desde demo",
        data: MOCK_CATEGORIES.filter((c) => !c.esBorrado) as any[],
      };
    }
    if (endpoint.includes("Productos") || endpoint === "/Productos/") {
      return {
        success: true,
        message: "Productos cargados desde demo",
        data: MOCK_PRODUCTS.filter((p) => !p.esBorrado) as any[],
      };
    }
    // Endpoints de Ventas
    if (endpoint.includes("VentaProducto/byVentaId")) {
      const ventaIdMatch = endpoint.match(/\/(\d+)/);
      if (ventaIdMatch) {
        const ventaId = parseInt(ventaIdMatch[1]);
        return {
          success: true,
          message: "Productos de venta cargados desde demo",
          data: getMockVentaProductosByVentaId(ventaId) as any[],
        };
      }
    }
    if (endpoint.includes("VentaProducto") && !endpoint.includes("byVentaId")) {
      return {
        success: true,
        message: "Productos de ventas cargados desde demo",
        data: MOCK_VENTA_PRODUCTOS as any[],
      };
    }
    if (endpoint.includes("/Venta") && !endpoint.includes("VentaProducto")) {
      return {
        success: true,
        message: "Ventas cargadas desde demo",
        data: MOCK_VENTAS as any[],
      };
    }
    return null;
  }

  async GetSimple<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<ResponseHelperModelSimple<T>> {
    try {
      // Soportar endpoints comunes en modo mock
      if (MOCK_MODE) {
        const mockResponse = this.getMockDataForSimpleEndpoint<T>(endpoint);
        if (mockResponse) {
          return mockResponse;
        }
      }

      const response = await this._api.get<ResponseHelperModelSimple<T>>(
        endpoint,
        { params },
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private getMockDataForSimpleEndpoint<T>(
    endpoint: string,
  ): ResponseHelperModelSimple<T> | null {
    // Manejar GET /Productos/:id
    if (
      endpoint.includes("/Productos/") &&
      !endpoint.includes("ProductsWithProveedor")
    ) {
      const idMatch = endpoint.match(/\/(\d+)$/);
      if (idMatch) {
        const productId = parseInt(idMatch[1]);
        const product = MOCK_PRODUCTS.find((p) => p.id === productId);
        if (product) {
          return {
            success: true,
            message: "Producto cargado desde demo",
            data: product as any,
          };
        }
      }
    }
    // Manejar GET /Account/GetUserById/:id
    if (endpoint.includes("/Account/GetUserById/")) {
      const idMatch = endpoint.match(/\/([^/]+)$/);
      if (idMatch) {
        const userId = idMatch[1];
        const user = MOCK_USERS.find((u) => u.id === userId);
        if (user) {
          return {
            success: true,
            message: "Usuario cargado desde demo",
            data: { name: user.name } as any,
          };
        }
      }
    }
    return null;
  }

  async GetSimpleEndpoint(endpoint: string, params?: Record<string, any>) {
    try {
      const response = await this._api.get(endpoint, { params });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async GetSimpleEndpointPDF(
    endpoint: string,
    params?: Record<string, any>,
    responseType: "json" | "blob" = "json",
  ) {
    try {
      const response = await this._api.get(endpoint, {
        params,
        responseType,
      });
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async Post<T>(
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<ResponseHelperModel<T>> {
    try {
      const response = await this._api.post<ResponseHelperModel<T>>(
        endpoint,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async Put<T>(
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<ResponseHelperModel<T>> {
    try {
      const response = await this._api.put<ResponseHelperModel<T>>(
        endpoint,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async Delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseHelperModel<T>> {
    try {
      const response = await this._api.delete<ResponseHelperModel<T>>(
        endpoint,
        config,
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
    console.error("Unexpected Error:", error);
    throw error;
  }
}
