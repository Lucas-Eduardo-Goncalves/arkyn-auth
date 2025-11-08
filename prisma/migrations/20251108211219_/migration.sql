-- CreateIndex
CREATE INDEX "User_name_createdAt_updatedAt_idx" ON "User"("name", "createdAt", "updatedAt");
