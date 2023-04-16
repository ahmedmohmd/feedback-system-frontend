import config from "../config/config";
import httpService from "./httpService";

const createFeedback = (data: any) => {
  return httpService.post(`${config.baseUrl}/feedbacks`, data);
};

export default { createFeedback };
