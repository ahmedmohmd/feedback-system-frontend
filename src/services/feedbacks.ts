import axios from "axios";
import config from "../config/config";

const getAllFeedbacks = async () => {
  const { data } = await axios.get(config.baseUrl);
  return data.data;
};

export { getAllFeedbacks };
