'use server';

import prisma from '../lib/db';
import React from 'react';


import { Pagination } from '../components/Pagenation';
import { revalidatePath } from 'next/cache';

export type PageProps = {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | string[] | undefined };
};

export type FetchFeedType = typeof fetchFeed;

const PAGE_SIZE = 8;

const fetchFeed = async ({ take = PAGE_SIZE, skip = 0 }) => {
	'use server';

	const results = await prisma.serial.findMany({
    take,
		skip,
		orderBy: {
			createdAt: 'desc',
		},
	});

  console.log(results);


	const total = await prisma.serial.count();

	revalidatePath('/');

	return {
		data: results,
		metadata: {
			hasNextPage: skip + take < total,
			totalPages: Math.ceil(total / take),
		},
	};
};

export const Feed = async (props: PageProps) => {
	const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.

	const take = PAGE_SIZE;
	const skip = (pageNumber - 1) * take; // Calculate skip based on page number.

	const { data, metadata } = await fetchFeed({ take, skip });

	return (
		<div className="">
			<div className="">
				{data.map((item, i) => (
					<div key={i} className="">
            <div className="" />

            <div className="">
              <h2 className="">{item.serial}</h2>
              <p className="">{item.boardName}</p>
            </div>
          </div>
				))}
			</div>

			<Pagination {...props.searchParams} {...metadata} />
		</div>
	);
};
