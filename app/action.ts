
import prisma from "@/app/lib/db";

export default async function LatestSerialNumber() {
  const serial = await prisma?.serial.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  });
  return serial
}