import React from 'react';
import prisma from '@/app/lib/db';

export default async function LatestSerial() {
    // 최근 시리얼 번호 조회
    const latestSerial = await prisma.serial.findMany({
        orderBy: { id: 'desc' },
    });

    console.log(latestSerial);
    return (
        <div>
            <h1>Dashboard Serial2 Page</h1>
         
        </div>
    );
}

