import express from "express";
import { doctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import validateRequest from "../../middlewares/validateRequest";
import { doctorScheduleValidation } from "./doctorSchedule.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.DOCTOR),
  validateRequest(
    doctorScheduleValidation.createDoctorScheduleValidationSchema,
  ),
  doctorScheduleController.insertIntoDB,
);

export const doctorScheduleRoutes = router;
