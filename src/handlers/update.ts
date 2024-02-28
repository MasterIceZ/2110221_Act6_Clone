import { PrismaClient } from "@prisma/client";

export const handleUpdate = async (
  contentType: string,
  secret: string,
  posX: string,
  posY: string,
  targetX: string,
  targetY: string,
  db: PrismaClient
) => {
  if (contentType != "application/x-www-form-urlencoded") {
    return {
      error: "Invalid content type",
    };
  }
  const player = await db.user.findUnique({
    where: {
      secret,
    },
  });
  if (!player) {
    return {
      error: "Invalid secret",
    };
  }
  await db.user.update({
    where: {
      secret,
    },
    data: {
      pos_x: posX,
      pos_y: posY,
      target_x: targetX,
      target_y: targetY,
    },
  });
  return {
    success: "Player data saved successfully",
  };
};
