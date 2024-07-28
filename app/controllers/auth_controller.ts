import type { HttpContext } from '@adonisjs/core/http';
import env from '#start/env';
// tokens
import jwt from 'jsonwebtoken';
// models
import User from '#models/User';

export default class AuthController {
	public async redirect({ ally, response }: HttpContext) {
		console.log('GOOGLE REDIRECT');
		const url = await ally.use('google').redirectUrl();
		console.log('GOOGLE URL', url);
		// console log ally callback url
		console.log(
			'GOOGLE REDIRECT CALLBACK URL',
			`${env.get('APP_URL')}/api/cms/auth/google/callback`
		);
		return response.json({ url });
	}

	public async callback({ ally, response }: HttpContext) {
		console.log('GOOGLE CALLBACK');
		const googleUser = await ally.use('google').user();
		console.log('GOOGLE CALLBACK USER', googleUser);
		const { email, name, avatarUrl } = googleUser;

		let user = await User.findOne({ email });

		if (!user) {
			const newUser = new User({
				role: '',
				email,
				name,
				avatarUrl,
			});
			user = await newUser.save();
			return response.redirect(`${env.get('FRONTEND_URL')}/cms/no-permission`);
		}
		if (user && user.role === '') {
			return response.redirect(`${env.get('FRONTEND_URL')}/cms/no-permission`);
		}

		if (user && user.role === 'admin') {
			const token = jwt.sign({ id: user._id }, env.get('JWT_SECRET'), { expiresIn: '7d' });
			response.cookie('taxspoc_token', token, {
				httpOnly: false,
				secure: env.get('NODE_ENV') === 'production',
				sameSite: 'lax',
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			});
			return response.redirect(`${env.get('FRONTEND_URL')}/cms/auth/create-article`);
		}
	}
}
