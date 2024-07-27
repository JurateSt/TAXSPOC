import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		https: {
			key: fs.readFileSync(path.resolve(__dirname, '../', process.env.SSL_KEY_PATH)),
			cert: fs.readFileSync(path.resolve(__dirname, '../', process.env.SSL_CERT_PATH)),
		},
	},
});
