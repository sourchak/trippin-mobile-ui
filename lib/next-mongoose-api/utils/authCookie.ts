// utils
import cookie from "./cookie";
import jwt from "./jwt";

// types
import { type AuthTokenData } from "../types/auth";

export const setAuthCookie = ({
  name,
  jwtSecret,
  payload,
  expiresIn
}: {
  name: string;
  jwtSecret: string;
  payload: AuthTokenData;
  expiresIn: number;
}) => {
  const token = jwt.generate<AuthTokenData>({
    payload,
    jwtSecret,
    expiresIn
  });

  cookie.set({
    name,
    value: token,
    auth: true,
    expiresIn
  });
};

export const getAuthCookie = ({
  name,
  jwtSecret
}: {
  name: string;
  jwtSecret: string;
}) => {
  const token = cookie.get({ name });

  if (!token) {
    return undefined;
  }

  return jwt.extract<AuthTokenData>({
    token,
    jwtSecret: jwtSecret
  });
};

const authCookie = {
  get: getAuthCookie,
  set: setAuthCookie
};

export default authCookie;
