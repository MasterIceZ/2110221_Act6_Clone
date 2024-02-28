import { PrismaClient } from "@prisma/client";

export const handleGetPlayerXY = async (
  secret: string,
  paramSecret: string,
  playerId: string,
  db: PrismaClient
) => {
  if (secret != paramSecret) {
    return {
      error: "Invalid secret",
    };
  }
  if (!playerId) {
    return {
      error: "Invalid player",
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

  if (parseInt(playerId) != player.id) {
    return {
      error: "Wrong secret for this id",
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
