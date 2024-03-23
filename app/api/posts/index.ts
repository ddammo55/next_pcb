// pages/api/posts/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const serial = await prisma.serial.findMany({
    skip,
    take: limit,
  });

  const totalPosts = await prisma.serial.count();
  const totalPages = Math.ceil(totalPosts / limit);

  res.status(200).json({ page, limit, totalPages, data: serial });
}