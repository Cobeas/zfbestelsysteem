-- CreateTable
CREATE TABLE "producten" (
    "product_id" SERIAL NOT NULL,
    "product_naam" TEXT NOT NULL,
    "product_prijs" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "producten_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "snacks" (
    "snack_id" SERIAL NOT NULL,
    "snack_naam" TEXT NOT NULL,
    "snack_prijs" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "snacks_pkey" PRIMARY KEY ("snack_id")
);

-- CreateTable
CREATE TABLE "bestellingen" (
    "bestelling_id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tafel" INTEGER NOT NULL,
    "notities" TEXT,
    "bar" INTEGER,
    "bezorgd" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "bestellingen_pkey" PRIMARY KEY ("bestelling_id")
);

-- CreateTable
CREATE TABLE "bestelling_product" (
    "id" SERIAL NOT NULL,
    "bestelling_id" INTEGER NOT NULL,
    "product_id" INTEGER,
    "snack_id" INTEGER,
    "aantal" INTEGER NOT NULL,

    CONSTRAINT "bestelling_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setup" (
    "setup_id" SERIAL NOT NULL,

    CONSTRAINT "setup_pkey" PRIMARY KEY ("setup_id")
);

-- CreateTable
CREATE TABLE "bars" (
    "bar_id" SERIAL NOT NULL,
    "bar_naam" TEXT NOT NULL,

    CONSTRAINT "bars_pkey" PRIMARY KEY ("bar_id")
);

-- CreateTable
CREATE TABLE "tafels" (
    "tafel_id" SERIAL NOT NULL,

    CONSTRAINT "tafels_pkey" PRIMARY KEY ("tafel_id")
);

-- CreateTable
CREATE TABLE "bar_tafel_relatie" (
    "relatie_id" SERIAL NOT NULL,
    "bar_id" INTEGER NOT NULL,
    "tafel_id" INTEGER NOT NULL,

    CONSTRAINT "bar_tafel_relatie_pkey" PRIMARY KEY ("relatie_id")
);

-- CreateTable
CREATE TABLE "logboek" (
    "logboek_id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "log_level" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "logboek_pkey" PRIMARY KEY ("logboek_id")
);

-- CreateTable
CREATE TABLE "trigger_tabel" (
    "trigger_id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trigger_tabel_pkey" PRIMARY KEY ("trigger_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producten_product_naam_key" ON "producten"("product_naam");

-- CreateIndex
CREATE UNIQUE INDEX "snacks_snack_naam_key" ON "snacks"("snack_naam");

-- CreateIndex
CREATE UNIQUE INDEX "bestelling_product_bestelling_id_product_id_snack_id_key" ON "bestelling_product"("bestelling_id", "product_id", "snack_id");

-- CreateIndex
CREATE UNIQUE INDEX "bars_bar_naam_key" ON "bars"("bar_naam");

-- AddForeignKey
ALTER TABLE "bestelling_product" ADD CONSTRAINT "bestelling_product_bestelling_id_fkey" FOREIGN KEY ("bestelling_id") REFERENCES "bestellingen"("bestelling_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bestelling_product" ADD CONSTRAINT "bestelling_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "producten"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bestelling_product" ADD CONSTRAINT "bestelling_product_snack_id_fkey" FOREIGN KEY ("snack_id") REFERENCES "snacks"("snack_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bar_tafel_relatie" ADD CONSTRAINT "bar_tafel_relatie_bar_id_fkey" FOREIGN KEY ("bar_id") REFERENCES "bars"("bar_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bar_tafel_relatie" ADD CONSTRAINT "bar_tafel_relatie_tafel_id_fkey" FOREIGN KEY ("tafel_id") REFERENCES "tafels"("tafel_id") ON DELETE RESTRICT ON UPDATE CASCADE;
