/** @format */

import React, { useEffect, useState } from 'react';
import { CategoryModel } from '../models/Products';
import handleAPI from '../apis/handleAPI';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { listColors } from '../constants/colors';

interface Props {
	id: string;
}

const CategoryComponent = (props: Props) => {
	const { id } = props;

	const [category, setCategory] = useState<CategoryModel>();

	useEffect(() => {
		getCategoryDetail();
	}, [id]);

	const getCategoryDetail = async () => {
		const api = `/products/categories/detail?id=${id}`;

		try {
			const res = await handleAPI(api);

			res.data && setCategory(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Link to={`/categories/detail/${category?.name}?id=${id}`}>
			<Tag color={listColors[Math.floor(Math.random() * listColors.length)]}>
				{category?.name}
			</Tag>
		</Link>
	);
};

export default CategoryComponent;
