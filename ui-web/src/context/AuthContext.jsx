import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext({
	isAuthenticated: false,
	user: null,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(['taxspoc_token']);
	const isAuthenticated = !!cookies.taxspoc_token;

	// useEffect(() => {
	// 	console.log('AUTH PROVIDER: isAuthenticated', isAuthenticated);
	// }, [isAuthenticated]);

	const login = (token) => {
		setCookie('taxspoc_token', token, { path: '/' });
	};

	const logout = () => {
		removeCookie('taxspoc_token', { path: '/' });
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
