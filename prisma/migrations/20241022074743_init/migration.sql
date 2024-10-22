-- CreateTable
CREATE TABLE "database_history" (
    "id" SERIAL NOT NULL,
    "detail" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "database_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "database_history" ADD CONSTRAINT "database_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
