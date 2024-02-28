-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "secret" TEXT NOT NULL,
    "pos_x" DOUBLE PRECISION NOT NULL,
    "pos_y" DOUBLE PRECISION NOT NULL,
    "target_x" DOUBLE PRECISION NOT NULL,
    "target_y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
