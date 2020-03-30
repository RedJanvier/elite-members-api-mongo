import { Schema, model } from 'mongoose';

const sharesSchema = Schema({
  _id: Schema.Types.ObjectId,
  member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  shares: { type: Number, default: 1 },
});

export default model('Shares', sharesSchema);
