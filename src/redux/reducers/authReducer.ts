/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { localDataNames } from '../../constants/appInfos';

export interface AuthState {
	accessToken: string;
	refreshToken: string;
	expiration: string;
	role: string;
}

const initialState = {
	accessToken: '',
	refreshToken: '',
	expiration: '',
	role: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		data: initialState,
	},
	reducers: {
		addAuth: (state, action) => {
			state.data = action.payload;
			syncLocal(action.payload);
		},
		removeAuth: (state, _action) => {
			state.data = initialState;
			syncLocal({});
		},
		refreshtoken: (state, action) => {
			state.data.accessToken = action.payload;
		},
	},
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, refreshtoken } = authSlice.actions;

export const authSeletor = (state: any) => state.authReducer.data;

const syncLocal = (data: any) => {
	localStorage.setItem(localDataNames.authData, JSON.stringify(data));
};
