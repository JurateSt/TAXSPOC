import mongoose, { Schema } from 'mongoose';

const CountrySchema = new Schema(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true, unique: true },
		code: { type: String, unique: true },
		description: { type: String },
		region: { type: String },
	},
	{ timestamps: true }
);

const Country = mongoose.model('Country', CountrySchema);

export default Country;
