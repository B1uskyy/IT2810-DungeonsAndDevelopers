import { model, Schema } from 'mongoose';

const RaceSchema = new Schema({
  index: String,
  name: String,
  speed: Number,
  alignment: String,
  size: String,
  size_description: String,
  img: String
});

export default model('Race', RaceSchema);