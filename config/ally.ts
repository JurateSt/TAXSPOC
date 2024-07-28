import env from '#start/env';
import { defineConfig, services } from '@adonisjs/ally';

console.log('ALLY', `${env.get('APP_URL')}/api/cms/auth/google/callback`);

const allyConfig = defineConfig({
	google: services.google({
		clientId: env.get('GOOGLE_CLIENT_ID'),
		clientSecret: env.get('GOOGLE_CLIENT_SECRET'),
		callbackUrl: `${env.get('APP_URL')}/api/cms/auth/google/callback`,
	}),
});

export default allyConfig;

declare module '@adonisjs/ally/types' {
	interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
