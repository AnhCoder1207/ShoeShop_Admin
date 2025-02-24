/** @format */

import axiosClient from './axiosClient';

const handleAPI = async (
	url: string,
	data?: any, // Thêm dữ liệu cần gửi (FormData hoặc JSON)
	method: 'post' | 'put' | 'get' | 'delete' = 'get', // Mặc định là 'get'
	config?: any
) => {
	// Nếu data là FormData, thêm header `Content-Type: multipart/form-data`
	const headers = data instanceof FormData
		? { 'Content-Type': 'multipart/form-data' }
		: { 'Content-Type': 'application/json' };

	return await axiosClient(url, {
		method,
		data,
		headers,
		...config
	});
};

export default handleAPI;
