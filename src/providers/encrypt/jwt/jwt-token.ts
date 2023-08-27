import jwt from "jsonwebtoken";
import ENV from "@src/env";

export interface JwtToken {
  sub: string;
}

class AuthProvider {
  public static generateToken(sub: string) {
    return jwt.sign({ sub }, ENV.TokenConfig.JWT_KEY, {
      expiresIn: ENV.TokenConfig.TOKEN_EXPIRES_IN
    });
  }

  public static decodeToken(token: string): JwtToken {
    return jwt.verify(token, ENV.TokenConfig.JWT_KEY) as JwtToken;
  }
}

export { AuthProvider };
