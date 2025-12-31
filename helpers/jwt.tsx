import * as jwt from "jsonwebtoken";

export function signToken(input: object) {
  return jwt.sign(input, process.env.JWT_CODE as string, { expiresIn: "7d" });
}

export function verifyToken(input: string) {
  return jwt.verify(input, process.env.JWT_CODE as string);
}
