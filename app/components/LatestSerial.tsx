import prisma from '@/app/lib/db';

interface LatestSerialProps {
    latestSerial: {
        value: string;
    };
}

export default async function LatestSerial() {
    const latestSerial = await prisma.serial.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { value: true },
    });

    console.log(latestSerial);
    return (
        <div>
            
        </div>
    );
}

