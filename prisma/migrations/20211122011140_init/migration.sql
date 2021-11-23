-- CreateTable
CREATE TABLE "gd_user" (
    "user_id" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT,
    "user_first_name" TEXT,
    "user_last_name" TEXT,
    "user_status" INTEGER,
    "user_create_at" TEXT,
    "user_update_at" TEXT,
    "user_create_by" TEXT,
    "user_update_by" TEXT,

    CONSTRAINT "gd_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gd_user_user_email_key" ON "gd_user"("user_email");
