-- CreateTable
CREATE TABLE "DeviceActivity" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeviceActivity" ADD CONSTRAINT "DeviceActivity_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
