import { PrismaClient } from "@prisma/client";

export const handleGetPlayerLook = async (secret: string, db: PrismaClient) => {
  console.log("called");

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
        shape: user.shape,
        color: user.color,
      },
    ])
  );
};
