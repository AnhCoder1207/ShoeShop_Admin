/** @format */

import {
	Button,
	Card,
	message,
	Modal,
	Space,
	Spin,
	Tooltip,
	Table,
} from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Edit2, Trash } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import handleAPI from '../../apis/handleAPI';
import { colors } from '../../constants/colors';
import { TreeModel } from '../../models/FormModel';
import { CategoryModel } from '../../models/Products';
import { getTreeValues } from '../../utils/getTreeValues';
import { AddCategory } from '../../components';

const { confirm } = Modal;

const Categories = () => {
	const [categories, setCategories] = useState<CategoryModel[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [treeValues, setTreeValues] = useState<TreeModel[]>([]);
	const [categorySelected, setCategorySelected] = useState<CategoryModel>();

	useEffect(() => {
		getCategories(`/admin/v1/category`, true);
	}, []);

	useEffect(() => {
		const api = `/admin/v1/category?page=${page}&pageSize=${pageSize}`;
		getCategories(api);
	}, [page, pageSize]);

	const getCategories = async (api: string, isSelect?: boolean) => {
		try {
			const res = await handleAPI(api);

			setCategories(res.data);
			if (isSelect) {
				setTreeValues(getTreeValues(res.data, true));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const columns: ColumnProps<CategoryModel>[] = [
		{
			key: 'title',
			title: 'Name',
			dataIndex: '',
			render: (item: CategoryModel) => (
				<Link to={`/categories/detail/${item.name}?id=${item.id}`}>
					{item.name}
				</Link>
			),
		},
		{
			key: 'description',
			title: 'Description',
			dataIndex: 'description',
		},
		{
			key: 'btnContainer',
			title: 'Actions',
			render: (item: CategoryModel) => (
				<Space>
					<Tooltip title='Edit category' key={'btnEdit'}>
						<Button
							onClick={() => setCategorySelected(item)}
							icon={<Edit2 size={20} color={colors.gray600} />}
							type='text'
						/>
					</Tooltip>
					<Tooltip title='Delete category' key={'btnDelete'}>
						<Button
							onClick={() =>
								confirm({
									title: 'Confirm',
									content: 'Are you sure you want to remove this category?',
									onOk: async () => handleRemove(item.id),
								})
							}
							icon={<Trash size={20} className='text-danger' />}
							type='text'
						/>
					</Tooltip>
				</Space>
			),
			align: 'right',
		},
	];

	const handleRemove = async (id: string) => {
		const api = `/products/delete-category?id=${id}`;

		try {
			await handleAPI(api, undefined, 'delete');
			setCategories((categories) =>
				categories.filter((element) => element.id !== id)
			);
			message.success('Deleted!!');
		} catch (error: any) {
			console.log(error);
			message.error(error.message);
		}
	};

	return isLoading ? (
		<Spin />
	) : (
		<div>
			<div className='container'>
				<div className='row'>
					<div className='col-md-4'>
						<Card title={'Add new'}>
							<AddCategory
								onClose={() => setCategorySelected(undefined)}
								seleted={categorySelected}
								onAddNew={async (val) => {
									if (categorySelected) {
										const items = [...categories];
										const index = items.findIndex(
											(element) => element.id === categorySelected.id
										);
										if (index !== -1) {
											items[index] = val;
										}

										setCategories(items);
										setCategorySelected(undefined);

										await getCategories(`/admin/v1/category`, true);
									} else {
										getCategories(
											`/admin/v1/category?page=${page}&pageSize=${pageSize}`
										);
									}
								}}
							/>
						</Card>
					</div>
					<div className='col-md-8'>
						<Card>
							<Table size='small' dataSource={categories} columns={columns} />
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categories;
