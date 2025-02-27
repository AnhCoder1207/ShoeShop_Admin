export const getTreeValues = (data: any[], isSelect?: boolean) => {
	const values: any = [];
	const items = data.filter((element) => !element.parentId); // Nếu API không có parentId, toàn bộ danh mục sẽ là root.

	const newItems = items.map((item) =>
		isSelect
			? {
					label: item.name, // Đổi `title` thành `name` theo API
					value: item.id,   // Đổi `_id` thành `id`
			  }
			: { ...item, key: item.id }
	);

	newItems.forEach((item) => {
		const children = changeMenu(
			data,
			isSelect ? item.value : item.id,
			isSelect ?? false
		);
		values.push({
			...item,
			children,
		});
	});

	return values;
};

const changeMenu = (data: any[], id: string, isSelect: boolean) => {
	const items: any = [];
	const datas = data.filter((element) => element.parentId === id);

	datas.forEach((val) =>
		items.push(
			isSelect
				? {
						label: val.name, // Đổi `title` thành `name`
						value: val.id,   // Đổi `_id` thành `id`
						children: changeMenu(data, val.id, isSelect),
				  }
				: {
						...val,
						key: val.id,
						children: changeMenu(data, val.id, isSelect),
				  }
		)
	);
	return items;
};
