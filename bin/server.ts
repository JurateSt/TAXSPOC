/*
|--------------------------------------------------------------------------
| HTTP server entrypoint
|--------------------------------------------------------------------------
|
| The "server.ts" file is the entrypoint for starting the AdonisJS HTTP
| server. Either you can run this file directly or use the "serve"
| command to run this file and monitor file changes
|
*/

import 'reflect-metadata';
import { Ignitor, prettyPrintError } from '@adonisjs/core';
import env from '#start/env';
import http from 'http';
import https from 'https';
import fs from 'fs';

/**
 * URL to the application root. AdonisJS need it to resolve
 * paths to file and directories for scaffolding commands
 */
const APP_ROOT = new URL('../', import.meta.url);

/**
 * The importer is used to import files in context of the
 * application.
 */
const IMPORTER = (filePath: string) => {
	if (filePath.startsWith('./') || filePath.startsWith('../')) {
		return import(new URL(filePath, APP_ROOT).href);
	}
	return import(filePath);
};

new Ignitor(APP_ROOT, { importer: IMPORTER })
	.tap((app) => {
		app.booting(async () => {
			await import('#start/env');
		});
		app.listen('SIGTERM', () => app.terminate());
		app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate());
	})
	.httpServer()
	.start((handler) => {
		// return https.createServer({ key, cert }, handle);
		if (env.get('USE_HTTPS') === true) {
			const key = fs.readFileSync(env.get('SSL_KEY_PATH'), 'utf8');
			const cert = fs.readFileSync(env.get('SSL_CERT_PATH'), 'utf8');
			return https.createServer({ key, cert }, handler);
		} else {
			return http.createServer(handler);
		}
	})
	.catch((error) => {
		process.exitCode = 1;
		prettyPrintError(error);
	});
