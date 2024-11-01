import Class from '../model/Class.ts';
import fetchData from '../../scripts/fetchData.ts';

interface ClassArgs {
  id: string;
}

interface PaginationArgs {
  offset?: number;
  limit?: number;
}

export default {
  Query: {
    async classes(_: any, { offset = 0, limit = 1 }: PaginationArgs) {
      const totalClasses = await Class.countDocuments();
      const classes = await Class.find().skip(offset).limit(limit);
      return { classes, totalClasses };
    },

    async class(_: any, { id }: ClassArgs) {
      return Class.findOne({ index: id });
    },
  },

  Mutation: {
    async fetchAllData() {
      await fetchData();
      return 'Data fetched and stored successfully!';
    },
  },
};