import { useNavigate } from "react-router-dom";
import { UserStore } from "../../security/store/userStore";

export const ClearSession = () => {
  const navigate = useNavigate();

  UserStore().clearUser();

  navigate("/login");

  return null;
};