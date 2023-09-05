import config from "../config/config";
import httpService from "./httpService";

const getFeedbacks = ({ queryKey }) => {
  const [, tags, sort] = queryKey;
  return httpService.get(`${config.baseUrl}/home/?tags=${tags}&sort=${sort}`);
};

const voteFeedback = (feedbackId) => {
  return httpService.post(`${config.baseUrl}/home/${feedbackId}`);
};

const getSingleFeedback = ({ queryKey }) => {
  return httpService.get(`${config.baseUrl}/home/${queryKey[1]}`);
};

const getComments = ({ queryKey }) => {
  return httpService.get(`${config.baseUrl}/home/${queryKey[0]}/comments`);
};

export default { voteFeedback, getSingleFeedback, getComments, getFeedbacks };
