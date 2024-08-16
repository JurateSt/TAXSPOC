import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const useHttps = process.env.USE_HTTPS === 'true';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		...(useHttps
			? {
					https: {
						key: fs.readFileSync(path.resolve(__dirname, '../', process.env.SSL_KEY_PATH), 'utf8'),
						cert: fs.readFileSync(
							path.resolve(__dirname, '../', process.env.SSL_CERT_PATH),
							'utf8'
						),
					},
				}
			: {}),
	},
	// server: {
	// 	https: {
	// 		key: fs.readFileSync(path.resolve(__dirname, '../', process.env.SSL_KEY_PATH)),
	// 		cert: fs.readFileSync(path.resolve(__dirname, '../', process.env.SSL_CERT_PATH)),
	// 	},
	// },
});
