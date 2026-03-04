import { prisma } from "../../../../lib/prisma";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = async (
  user: IJWTPayload,
  payload: { scheduleIds: string[] },
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  // console.log("payload", payload);

  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  // console.log(doctorScheduleData);

  return await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });

  // console.log(user);
};

export const doctorScheduleService = {
  insertIntoDB,
};
