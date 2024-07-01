import mongoose, { Schema } from 'mongoose';

const OtherCategorySchema = new Schema(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true, unique: true },
		description: { type: String },
	},
	{ timestamps: true }
);

const OtherCategory = mongoose.model('OtherCategory', OtherCategorySchema, 'other_categories');

export default OtherCategory;
