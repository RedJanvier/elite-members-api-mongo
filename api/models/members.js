import { Schema, model } from 'mongoose';

const memberSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  committee: { type: String },
  image: { type: String, required: true },
  shares: { type: Number, default: 1 },
});

export default model('Member', memberSchema);
