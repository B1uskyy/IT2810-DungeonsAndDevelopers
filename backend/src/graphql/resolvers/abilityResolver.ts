import AbilityScore from '../model/AbilityScore.js';
import fetchData from '../../scripts/fetchData.ts';

export default {
  Query: {

    async abilities(_: any, offset = 0, limit = 1) {
      const totalAbilities = await AbilityScore.countDocuments();
      const abilities = await AbilityScore.find().skip(offset).limit(limit);
      return { abilities, totalAbilities };
    },

    async ability(_: any, { id }: any) {
      return AbilityScore.findOne({ index: id });
    },

  },

  Mutation: {
    async fetchAllData() {
      await fetchData();
      return 'Data fetched and stored successfully!';
    },
  },
};