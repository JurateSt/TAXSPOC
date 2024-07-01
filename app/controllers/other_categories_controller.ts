import type { HttpContext } from '@adonisjs/core/http';
import OtherCategory from '#models/OtherCategory';

export default class OtherCategoriesController {
	public async index({ response }: HttpContext) {
		const otherCategories = await OtherCategory.find();
		return response.json(otherCategories);
	}
}
