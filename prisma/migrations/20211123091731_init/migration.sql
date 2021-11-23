-- CreateTable
CREATE TABLE "gd_user" (
    "user_id" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT,
    "user_first_name" TEXT,
    "user_last_name" TEXT,
    "user_status" INTEGER,
    "user_create_at" TIMESTAMP(3),
    "user_update_at" TIMESTAMP(3),
    "user_create_by" TEXT,
    "user_update_by" TEXT,

    CONSTRAINT "gd_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "gd_token" (
    "access_token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "referesh_token" TEXT,
    "token_create_at" TEXT,
    "token_expired_at" TEXT,

    CONSTRAINT "gd_token_pkey" PRIMARY KEY ("access_token","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gd_user_user_email_key" ON "gd_user"("user_email");

-- AddForeignKey
ALTER TABLE "gd_token" ADD CONSTRAINT "gd_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "gd_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
