import express from "express";
import { DoctorController } from "./doctor.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";

const router = express.Router();

router.get("/", DoctorController.getAllFromDB);

router.post("/suggestion", DoctorController.getAISuggestions);

router.patch("/:id", DoctorController.updateIntoDB);
//task added

router.get("/:id", DoctorController.getByIdFromDB);

//task added
router.delete("/:id", auth(UserRole.ADMIN), DoctorController.deleteFromDB);

// task added
router.delete("/soft/:id", auth(UserRole.ADMIN), DoctorController.softDelete);

export const DoctorRoutes = router;
