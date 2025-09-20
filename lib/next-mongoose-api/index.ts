import getAuthHandler from "./utils/getAuthHandler";
import getAuthRequest from "./utils/getAuthRequest";
import getHandler from "./utils/getHandler";
import getRequest from "./utils/getRequest";

export const getAuthAPIHandler = getAuthHandler;
export const getAuthAPIRequest = getAuthRequest;
export const getAPIHandler = getHandler;
export const getAPIRequest = getRequest;

const nextMongooseAPI = {
  getAuthAPIHandler,
  getAuthAPIRequest,
  getAPIHandler,
  getAPIRequest
};

export default nextMongooseAPI;
