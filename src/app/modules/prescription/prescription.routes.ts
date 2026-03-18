import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { PrescriptionController } from "./prescription.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.DOCTOR),
  PrescriptionController.createPrescription,
);

export const PrescriptionRoutes = router;
