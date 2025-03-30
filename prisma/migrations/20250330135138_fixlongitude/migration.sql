/*
  Warnings:

  - You are about to drop the column `longtitude` on the `RiderPosition` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `RiderPosition` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RiderPosition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "riderId" INTEGER NOT NULL,
    CONSTRAINT "RiderPosition_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RiderPosition" ("createdAt", "id", "latitude", "riderId", "updatedAt") SELECT "createdAt", "id", "latitude", "riderId", "updatedAt" FROM "RiderPosition";
DROP TABLE "RiderPosition";
ALTER TABLE "new_RiderPosition" RENAME TO "RiderPosition";
CREATE UNIQUE INDEX "RiderPosition_riderId_key" ON "RiderPosition"("riderId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
