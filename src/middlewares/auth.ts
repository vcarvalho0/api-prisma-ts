import { AuthProvider } from "@src/providers/encrypt/jwt/jwt-token";
import { NextFunction, Request, Response } from "express";

export function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Response<unknown, Record<string, unknown>> | void {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.status(401).json({ auth: false, error: "Token not found" });
  }

  try {
    const token = authorization.split(" ")[1];
    const claims = AuthProvider.decodeToken(token as string);
    req.context = { userId: claims.sub };
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ auth: false, error: "Invalid token or expired" });
  }
}
