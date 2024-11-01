import { model, Schema } from 'mongoose';



const AbilityScoreSchema = new Schema({
  index: String,
  name: String,
  //desc: [String],
  skills: [String],


});


export default model('Ability Score', AbilityScoreSchema);