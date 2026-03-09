import { UserStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { jwtHelper } from "../../helper/jwtHelper";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password is incorrect !");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.token.access_token_secret as string,
    "1h",
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.token.refresh_token_secret as string,
    "30d",
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

export const authService = {
  login,
};
