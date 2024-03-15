import prisma from '@/app/lib/db';

export default async function handler(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
  
    try {
      const serials = await prisma.serial.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(serials);
    } catch (error) {
      res.status(500).json({ message: "서버 에러" });
    }
  }