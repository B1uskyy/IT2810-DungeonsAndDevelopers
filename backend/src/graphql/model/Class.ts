import { model, Schema } from 'mongoose';

const ClassSchema = new Schema({
  index: String,
  name: String,
  hit_die: Number,
  skills: [String],
});

export default model('Class', ClassSchema);