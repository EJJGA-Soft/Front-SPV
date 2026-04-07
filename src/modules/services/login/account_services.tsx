import axios from "axios";
import { Api_Connection } from "../API/api_connection";
import { ILoginAccount } from "../../../interfaces/loginAccount_interface";
import { IAccount } from "../../../interfaces/newAccount._interface";
import { IStrategyAccount } from "../../../interfaces/IStrategyAccount_interface";
import { ResponseHelper } from "../../../interfaces/responseHelper_interface";
import { UserStore } from "../../../security/store/userStore";
import { MOCK_MODE, getMockUserByEmail } from "../mockData";

const url = `${Api_Connection()}Account/`;

export default class AccountService {
  async Login(account: ILoginAccount): Promise<ResponseHelper> {
    try {
      // Usar autenticación mock si está habilitado
      if (MOCK_MODE) {
        return this.loginMock(account);
      }

      const sendData = await axios.post(`${url}login`, account);
      const strategyAccount = sendData.data.data as IStrategyAccount;
      const response = sendData.data as ResponseHelper;

      if (
        response.message === "Usuario no encontrado" ||
        response.message === "Usuario o contraseña incorrectos"
      ) {
        return {
          success: false,
          message: "Usuario o contraseña incorrectos",
        };
      } else {
        const searchUserById = await axios.get(
          `${url}GetUserById/${strategyAccount.id}`,
        );
        const userData = searchUserById.data.data as IAccount;

        UserStore.getState().setUser(
          strategyAccount.id,
          userData.name,
          userData.email,
          "authenticated",
          userData.rol,
        );

        return {
          success: true,
          message: "Ha iniciado sesión con exito, Bienvenido: " + userData.name,
        };
      }
    } catch (error: unknown) {
      return {
        success: false,
        message: "Ha ocurrido un error: " + error,
      };
    }
  }

  private async loginMock(account: ILoginAccount): Promise<ResponseHelper> {
    const mockUser = getMockUserByEmail(account.email);

    if (!mockUser) {
      return {
        success: false,
        message: "Usuario no encontrado",
      };
    }

    if (mockUser.password !== account.password) {
      return {
        success: false,
        message: "Usuario o contraseña incorrectos",
      };
    }

    // Guardar usuario en el store
    UserStore.getState().setUser(
      mockUser.id!,
      mockUser.name,
      mockUser.email,
      "authenticated",
      mockUser.rol,
    );

    return {
      success: true,
      message: `Ha iniciado sesión con éxito. Bienvenido: ${mockUser.name}`,
    };
  }
}
