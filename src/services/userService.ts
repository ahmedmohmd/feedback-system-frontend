import config from "../config/config";
import httpService from "./httpService";

const updateUser = (userData) => {
  return httpService.patch(`${config.baseUrl}/user`, userData);
};

export default { updateUser };
