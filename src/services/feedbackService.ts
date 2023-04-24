import config from "../config/config";
import httpService from "./httpService";

const createFeedback = (data: any) => {
  return httpService.post(`${config.baseUrl}/feedbacks`, data);
};

const getAllFeedbacks = async (keys) => {
  return httpService.get(
    `${config.baseUrl}/home/?sort=${keys.queryKey[0]}&tags=${keys.queryKey[1]}`
  );
};

const getSingleFeedback = ({ queryKey }) => {
  return httpService.get(`${config.baseUrl}/feedbacks/${queryKey[0]}`);
};

export default { createFeedback, getAllFeedbacks, getSingleFeedback };
