// app/api/serials.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db'; // Prisma 클라이언트 import 경로를 확인하세요.

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  const serials = await prisma.serial.findMany({
    skip,
    take: limit,
  });

  return new NextResponse(JSON.stringify(serials), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}