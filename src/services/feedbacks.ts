import axios from "axios";
import config from "../config/config";

const getAllFeedbacks = async (keys) => {
  const { data } = await axios.get(
    `${config.baseUrl}/home/?sort=${
      keys.queryKey[0]
    }&tags=${keys.queryKey[1].join(",")}`
  );

  return data.data;
};

export { getAllFeedbacks };
