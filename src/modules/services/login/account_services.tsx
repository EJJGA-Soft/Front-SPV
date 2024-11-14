import axios from "axios";
import { INewAccount } from '../../../interfaces/newAccount._interface';
import { Api_Connection } from "../API/api_connection";
import { ResponseHelper } from '../../../interfaces/responseHelper_interface';

const url = `${Api_Connection()}Account/`;

export default class AccountService {

    async registerAccount(newAccount: INewAccount): Promise<ResponseHelper>{
        console.log(url)
        try {
            const response = await axios.post<ResponseHelper>(`${url + 'register'}`, newAccount);

            return response.data as ResponseHelper;

        } catch (error) {
            return {
                success: false,
                message: `Ocurrio un error: ${error}`,
                data: [],
              };
        }
    }
}