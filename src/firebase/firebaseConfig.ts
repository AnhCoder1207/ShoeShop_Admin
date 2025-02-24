/** @format */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyCgnHckc9XwESg7qvM5ZVkkRgD-YNjfFVs",
	authDomain: "shoeshop-admin.firebaseapp.com",
	projectId: "shoeshop-admin",
	storageBucket: "shoeshop-admin.firebasestorage.app",
	messagingSenderId: "312372381053",
	appId: "1:312372381053:web:fc632bfa672069ae333814",
	measurementId: "G-TGZVLPMVFD"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();

auth.languageCode = 'vi';
