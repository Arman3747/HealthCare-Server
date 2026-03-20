import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload, PrescriptionQuery } from "../../types/common";
import { PrescriptionService } from "./prescription.service";
import { pick } from "zod/v4/core/util.cjs";
import httpStatus from "http-status";

const createPrescription = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionService.createPrescription(
      user as IJWTPayload,
      req.body,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Prescription Created successfully!",
      data: result,
    });
  },
);

/**
 * const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const filters = pick(req.query, doctorFilterableFields);
*/

// const patientPrescription = catchAsync(
//   async (req: Request & { user?: IJWTPayload }, res: Response) => {
//     const user = req.user;
//     const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
//     const result = await PrescriptionService.patientPrescription(
//       user as IJWTPayload,
//       options,
//     );
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Prescription fetched successfully",
//       meta: result.meta,
//       data: result.data,
//     });
//   },
// );

export const PrescriptionController = {
  createPrescription,
  // patientPrescription,
};
