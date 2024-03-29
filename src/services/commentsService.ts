import config from "../config/config";
import httpService from "./httpService";

const getComments = ({ queryKey }) => {
  return httpService.get(`${config.baseUrl}/feedbacks/${queryKey[0]}/comments`);
};
const postComment = ({ commentData, feedbackId }) => {
  return httpService.post(
    `${config.baseUrl}/feedbacks/${feedbackId}/comments`,
    commentData
  );
};
const deleteComment = ({ commentId, feedbackId }) => {
  return httpService.delete(
    `${config.baseUrl}/feedbacks/${feedbackId}/comments/${commentId}`
  );
};

export default { getComments, postComment, deleteComment };
