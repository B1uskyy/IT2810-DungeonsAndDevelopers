import { model, Schema } from 'mongoose';

const EquipmentSchema = new Schema({
  index: String,
  name: String,
  category: String,
  value: Number,
});

export default model('Equipment', EquipmentSchema);
