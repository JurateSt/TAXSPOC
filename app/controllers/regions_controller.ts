import type { HttpContext } from '@adonisjs/core/http';
import Region from '#models/Region';

export default class RegionsController {
	public async index({ response }: HttpContext) {
		const regions = await Region.find();
		return response.json(regions);
	}
}
