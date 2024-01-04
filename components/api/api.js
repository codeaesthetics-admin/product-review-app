import axios from "axios";
const baseURL = "http://sheeda.consoliads.com:";

export const axiosRequest = async (method_, url_, body, params_) => {
  const URL = baseURL + url_;
  const response = await axios({
    header: "accept: application/json",
    method: method_,
    url: URL,
    data: body,
    params: params_,
  });

  return response;
};

export { baseURL };
