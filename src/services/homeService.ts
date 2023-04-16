import config from "../config/config";
import httpService from "./httpService";

const voteFeedback = (feedbackId) => {
  return httpService.post(`${config.baseUrl}/home/${feedbackId}`);
};

export default { voteFeedback };
