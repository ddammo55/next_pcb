import Link from 'next/link';
import React from 'react';

export default function DashboardNav() {
    return (
        <div>
            <Link href='/dashboard/serial'>시리얼번호생성</Link>
        </div>
    );
}