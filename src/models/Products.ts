/** @format */

export interface CategoryModel {
	id: string;
	name: string;
	image: string;
	status: string;
	isDeleted: boolean;
	description: string;
}

export interface ProductModel {
	id: string;
	name: string;
	price: number;
	shortDescription: string;
	longDescription: string;
	images: any[];
	inventories: inventoriesModel[];
}	

export interface inventoriesModel {
	color: string;
	supplierId: string;
	quantityInStock: number;
	minimumInStock: number;
	maximumInStock: number;
	lastRestockDate: string;
	statusInventory: string;
	size: string;
}


export interface SubProductModel {
	size: string;
	color: string;
	price: number;
	qty: number;
	productId: string;
	images: any[];
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
