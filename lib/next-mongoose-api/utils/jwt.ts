// library
import { sign, verify } from "jsonwebtoken";

export const generateJWT = <T>({
  payload,
  jwtSecret,
  expiresIn
}: {
  payload: T;
  jwtSecret: string;
  expiresIn: number;
}) =>
  sign(payload as Object, jwtSecret, {
    expiresIn
  });

export const extractJWT = <T>({
  token,
  jwtSecret
}: {
  token: string;
  jwtSecret: string;
}): T => verify(token, jwtSecret) as T;

const jwt = {
  extract: extractJWT,
  generate: generateJWT
};

export default jwt;
