import jwt from "jsonwebtoken";

export interface JwtPayload {
  email: string;
  userUUID: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return secret;
};

export const generateToken = (
  email: string,
  userUUID: string
): string => {
  return jwt.sign({ email, userUUID }, getJwtSecret(), {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
};
