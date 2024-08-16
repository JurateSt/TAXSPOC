import type { HttpContext } from '@adonisjs/core/http';
import Country from '#models/Country';

export default class RegionsController {
	public async index({ request, response }: HttpContext) {
		const regionIds = request.qs().regions;

		let countries;
		if (regionIds?.length > 0) {
			// const regionIdsArray = regionIds.split(',');
			countries = await Country.find({ region: { $in: regionIds } });
		} else {
			countries = await Country.find();
		}
		return response.json(countries);
	}

	public async show({ params, response }: HttpContext) {
		const country = await Country.find(params.id);
		return response.json(country);
	}
}
