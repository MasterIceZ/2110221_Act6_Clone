import { PrismaClient } from "@prisma/client";

export const handleGetPlayerLook = async (
  secret: string,
  paramSecret: string,
  playerId: string,
  db: PrismaClient
) => {
  console.log("called");
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
        shape: user.shape,
        color: user.color,
      },
    ])
  );
};
