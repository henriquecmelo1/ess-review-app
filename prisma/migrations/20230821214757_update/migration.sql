/*
  Warnings:

  - You are about to drop the `_Friendship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Friendship" DROP CONSTRAINT "_Friendship_A_fkey";

-- DropForeignKey
ALTER TABLE "_Friendship" DROP CONSTRAINT "_Friendship_B_fkey";

-- DropTable
DROP TABLE "_Friendship";

-- CreateTable
CREATE TABLE "_Relationship" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Relationship_AB_unique" ON "_Relationship"("A", "B");

-- CreateIndex
CREATE INDEX "_Relationship_B_index" ON "_Relationship"("B");

-- AddForeignKey
ALTER TABLE "_Relationship" ADD CONSTRAINT "_Relationship_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Relationship" ADD CONSTRAINT "_Relationship_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
