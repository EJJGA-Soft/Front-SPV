import axios from "axios";
import { Api_Connection } from "../API/api_connection";
import { ResponseHelperModel } from "../../../interfaces/responseHelper_T_interface";
import { IUser } from "../../../interfaces/user_interface";

const url = `${Api_Connection()}Account/`;

export default class UserService {

    async GetUsers(): Promise<ResponseHelperModel<IUser>> {
        try {
            const response = await axios.get(`${url}AllUsersWithRole`);
            return response.data as ResponseHelperModel<IUser>;
        } catch (error) {
            return {
                success: false,
                message: `Ocurrió un error: ${error}`,
            };
        }
    }

    async UpdateUsers(): Promise<ResponseHelperModel<IUser>>{
        try {
            const response = await axios.put<ResponseHelperModel<IUser>>(`${url + 'UpdateAccount'}`);
            return response.data as ResponseHelperModel<IUser>;
        } catch (error) {
            return {
                success: false,
                message: `Ocurrio un error: ${error}`,
              };
        }
    }
}