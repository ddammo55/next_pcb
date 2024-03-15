

import React from 'react';
import fetch from 'node-fetch'; // node-fetch는 Node.js 환경에서 fetch API를 사용하기 위한 라이브러리입니다.

async function fetchSerials({page, limit}: {page: number, limit: number}) {
  const response = await fetch(`http://localhost:3000/api/serials?page=${page}&limit=${limit}`);
  const serials = await response.json();
  return serials;
}

export default function SerialList() {
    // 초기 페이지와 데이터를 로드합니다. 실제 사용시에는 동적으로 페이지를 변경하는 로직을 구현해야 합니다.
    const fetchAndRenderSerials = async () => {
        const serials: unknown = await fetchSerials({ page: 1, limit: 5 });
        return (serials as unknown[]).map((serial, index) => (
            <li key={index}>{(serial as string)}</li>
        ));
    };

    return (
        <ul>
            {fetchAndRenderSerials()}
        </ul>
    );
}