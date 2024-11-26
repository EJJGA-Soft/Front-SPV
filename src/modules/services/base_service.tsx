import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ResponseHelperModel, ResponseHelperModelSimple } from "../../interfaces/responseHelper_T_interface";
import { Api_Connection } from "./API/api_connection";

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

    async Get<T>(endpoint: string, params?: Record<string, any>): Promise<ResponseHelperModel<T>> {
        try {
            const response = await this._api.get<ResponseHelperModel<T>>(endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async GetSimple<T>(endpoint: string, params?: Record<string, any>): Promise<ResponseHelperModelSimple<T>> {
        try {
            const response = await this._api.get<ResponseHelperModelSimple<T>>(endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

        async GetSimpleEndpoint(endpoint: string, params?: Record<string, any>){
            try {
                const response = await this._api.get(endpoint, { params });
                return response;
            } catch (error) {
                this.handleError(error);
            }
        }

        async GetSimpleEndpointPDF(endpoint: string, params?: Record<string, any>, responseType: 'json' | 'blob' = 'json') {
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

    async Post<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<ResponseHelperModel<T>> {
        try {
            const response = await this._api.post<ResponseHelperModel<T>>(endpoint, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async Put<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<ResponseHelperModel<T>> {
        try {
            const response = await this._api.put<ResponseHelperModel<T>>(endpoint, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async Delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ResponseHelperModel<T>> {
        try {
            const response = await this._api.delete<ResponseHelperModel<T>>(endpoint, config);
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
