import Race from '../model/Race.ts';
import fetchData from '../../scripts/fetchData.js';

interface RaceArgs {
  id: string;
}

interface PaginationArgs {
  offset?: number;
  limit?: number;
}

export default {
  Query: {
    async races(_: any, { offset = 0, limit = 1 }: PaginationArgs) {
      const totalRaces = await Race.countDocuments();
      const races = await Race.find().skip(offset).limit(limit);
      return { races, totalRaces };
    },

    async race(_: any, { id }: RaceArgs) {
      return Race.findOne({ index: id });
    },
  },

  Mutation: {
    async fetchAllData() {
      await fetchData();
      return 'Data fetched and stored successfully!';
    },
  },
};