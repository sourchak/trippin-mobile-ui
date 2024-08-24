import getHandler from "./utils/getHandler";
import getRequest from "./utils/getRequest";

export const getAPIHandler = getHandler;
export const getAPIRequest = getRequest;

const nextMongooseAPI = {
  getAPIHandler,
  getAPIRequest
};

export default nextMongooseAPI;
