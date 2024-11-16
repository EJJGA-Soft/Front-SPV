import axios from "axios";
import { Api_Connection } from "../API/api_connection";
import { ILoginAccount } from "../../../interfaces/loginAccount_interface";
import { IAccount } from "../../../interfaces/newAccount._interface";
import { IStrategyAccount } from "../../../interfaces/IStrategyAccount_interface";
import { ResponseHelper } from "../../../interfaces/responseHelper_interface";
import { UserStore } from "../../../security/store/userStore";

const url = `${Api_Connection()}Account/`;

export default class AccountService {

    async Login(account: ILoginAccount): Promise<ResponseHelper> {
        try {
            const sendData = await axios.post(`${url}login`, account);
            const strategyAccount = sendData.data.data as IStrategyAccount;
            const response = sendData.data as ResponseHelper;

            if(response.message === "Usuario no encontrado" || response.message === "Usuario o contraseña incorrectos") {
                return {
                    success: false,
                    message: "Usuario o contraseña incorrectos",
                }
            } else {
                const searchUserById = await axios.get(`${url}GetUserById/${strategyAccount.id}`);
                const userData = searchUserById.data.data as IAccount;
                
                UserStore.getState().setUser(
                    userData.name,
                    userData.email,
                    "authenticated",
                    userData.rol
                );

                return {
                    success: true,
                    message: "Ha iniciado sesión con exito, Bienvenido: " + userData.name,
                }
            }
        } catch (error: unknown) {
            return {
                success: false,
                message: "Ha ocurrido un error: " + error,
            }
        }
    }
}