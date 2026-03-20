import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../helper/jwtHelper";
import config from "../../config";
import { IJWTPayload } from "../types/common";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    // req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) {
        throw new Error("You are not authorized!");
      }

      const verifyUser = jwtHelper.verifyToken(
        token,
        config.token.access_token_secret as string,
      );

      req.user = verifyUser;

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new Error("You afe not authorized!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
