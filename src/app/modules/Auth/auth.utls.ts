import Jwt from "jsonwebtoken";
export const accesstoken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return Jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn,
  });
};
