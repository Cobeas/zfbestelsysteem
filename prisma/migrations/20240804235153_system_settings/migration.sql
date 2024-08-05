-- CreateTable
CREATE TABLE "system_settings" (
    "id" SERIAL NOT NULL,
    "jwt" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id")
);
