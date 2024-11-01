import { model, Schema, Types } from 'mongoose';

const reviewSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  difficulty: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


const monsterSchema = new Schema({
  name: String,
  size: String,
  type: String,
  alignment: String,
  hit_points: Number,
  image: String,
  reviews: [reviewSchema],
});

export default model('Monster', monsterSchema);