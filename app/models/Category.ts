import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema(
	{
		_id: { type: Number, required: true, unique: true },
		name: { type: String, required: true, unique: true },
		description: { type: String },
	},
	{ timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);

export default Category;
