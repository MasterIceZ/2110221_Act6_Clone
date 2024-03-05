import { PrismaClient } from "@prisma/client";

export const handleGetPlayerXY = async (secret: string, db: PrismaClient) => {
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

  const all = await db.user.findMany();

  return Object.fromEntries(
    all.map((user) => [
      "p" + user.id,
      {
        pos_x: user.pos_x,
        pos_y: user.pos_y,
        target_x: user.target_x,
        target_y: user.target_y,
      },
    ])
  );
};
