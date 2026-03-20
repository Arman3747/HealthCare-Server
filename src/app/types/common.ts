import { UserRole } from "../../../generated/prisma/enums";

export type IJWTPayload = {
  email: string;
  role: UserRole;
};


export type PrescriptionQuery = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};