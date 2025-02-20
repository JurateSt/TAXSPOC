import mongoose, { Schema } from 'mongoose';

const RegionSchema = new Schema(
	{
		_id: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		name: { type: String, required: true, unique: true },
		description: { type: String },
	},
	{ timestamps: true }
);

const Region = mongoose.model('Region', RegionSchema);

export default Region;
