import { model, Schema, Types } from 'mongoose';

const playerSchema = new Schema({
  userName: String,
  class: { type: Types.ObjectId, ref: 'Class' },
  race: { type: Types.ObjectId, ref: 'Race' },
  abilityScores: {type:[Number], default: [0,0,0,0,0,0]},
  equipments: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
  favoritedMonsters: [{ type: Types.ObjectId, ref: 'Monster' }],
  dungeonName: { type: String, default: 'My Dungeon' },
});

export default model('User', playerSchema);
