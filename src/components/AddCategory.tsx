/** @format */

import { Button, Form, Input, message, Space, Select, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import handleAPI from '../apis/handleAPI';
import { CategoryModel } from '../models/Products';

interface Props {
	onAddNew: (val: any) => void;
	seleted?: CategoryModel;
	onClose?: () => void;
}

const AddCategory = (props: Props) => {
	const { onAddNew, seleted, onClose } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [form] = Form.useForm();
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		if (seleted) {
			form.setFieldsValue(seleted);
		} else {
			form.resetFields();
		}
	}, [seleted]);

	// Xử lý khi tải ảnh lên
	const handleFileChange = (info: any) => {
		if (info.file.status === 'done' || info.file.status === 'uploading') {
			setFile(info.file.originFileObj);
		}
	};

	const handleCategory = async (values: any) => {
		setIsLoading(true);

		const api = seleted
			? `/admin/v1/category/${seleted.id}`
			: `/admin/v1/category`;

		// Tạo FormData để gửi request
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('status', values.status || 'NO_ACTIVE');
		formData.append('description', values.description || '');
		formData.append('isDeleted', values.isDeleted ? 'true' : 'false');

		if (file) {
			formData.append('image', file);
		}

		try {
			const res = await handleAPI(api, formData, seleted ? 'put' : 'post', {
				'Content-Type': 'multipart/form-data',
			});
			message.success(seleted ? 'Category updated successfully!' : 'Category added successfully!');

			onAddNew(res.data);
			form.resetFields();
			setFile(null);
		} catch (error: any) {
			message.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Form
				disabled={isLoading}
				form={form}
				layout='vertical'
				onFinish={handleCategory}
				size='large'
			>
				{/* Nhập tên danh mục */}
				<Form.Item
					name={'name'}
					rules={[{ required: true, message: 'Enter category name' }]}
					label='Category Name'
				>
					<Input allowClear placeholder="Enter category name" />
				</Form.Item>

				{/* Chọn trạng thái danh mục */}
				<Form.Item
					name={'status'}
					rules={[{ required: true, message: 'Select status' }]}
					label='Status'
				>
					<Select>
						<Select.Option value="ACTIVE">Active</Select.Option>
						<Select.Option value="NO_ACTIVE">Inactive</Select.Option>
					</Select>
				</Form.Item>

				{/* Nhập mô tả */}
				<Form.Item name={'description'} label='Description'>
					<Input.TextArea rows={4} placeholder="Enter category description" />
				</Form.Item>

				{/* Upload ảnh */}
				<Form.Item label="Image">
					<Upload
						beforeUpload={() => false}
						onChange={handleFileChange}
						showUploadList={{ showPreviewIcon: false }}
					>
						<Button icon={<UploadOutlined />}>Upload Image</Button>
					</Upload>
				</Form.Item>

				{/* Trạng thái xóa danh mục */}
				<Form.Item name={'isDeleted'} label='Deleted?' valuePropName="checked">
					<Switch />
				</Form.Item>
			</Form>

			<div className='text-right'>
				<Space>
					{onClose && (
						<Button
							loading={isLoading}
							disabled={isLoading}
							onClick={() => {
								form.resetFields();
								setFile(null);
								onClose();
							}}
						>
							Cancel
						</Button>
					)}
					<Button
						loading={isLoading}
						disabled={isLoading}
						type='primary'
						onClick={() => form.submit()}
					>
						{seleted ? 'Update' : 'Submit'}
					</Button>
				</Space>
			</div>
		</>
	);
};

export default AddCategory;
