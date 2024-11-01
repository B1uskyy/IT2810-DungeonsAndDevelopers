import Monster from '../model/Monsters.ts';
import User from '../model/User.ts';
import fetchData from '../../scripts/fetchData.js';

interface MonsterArgs {
  id: string;
}

interface MonsterQueryArgs {
  searchTerm?: string;
  offset?: number;
  limit?: number;
  types?: string[];
}

interface ReviewInput {
  user: string;
  difficulty: number;
  description: string;
}

export default {
  Query: {
    async monsters(_: any, { searchTerm = '', offset = 0, limit = 8, types = [] }: MonsterQueryArgs) {
      let query: any = {};

      if (searchTerm) {
        const startsWithRegex = new RegExp(`^${searchTerm}`, 'i');
        const containsRegex = new RegExp(searchTerm, 'i');

        query.name = { $regex: startsWithRegex };

        let monsters = await Monster.find(query).skip(offset).limit(limit);

        if (monsters.length < limit) {
          const additionalQuery = { name: { $regex: containsRegex }, _id: { $nin: monsters.map(m => m._id) } };
          const additionalResults = await Monster.find(additionalQuery).skip(offset).limit(limit - monsters.length);
          monsters = [...monsters, ...additionalResults];
        }

        const totalMonsters = await Monster.countDocuments({ name: { $regex: containsRegex } });

        return { monsters, totalMonsters };
      }

      if (types.length > 0) {
        query.type = { $in: types };
      }

      const monsters = await Monster.find(query).skip(offset).limit(limit);
      const totalMonsters = await Monster.countDocuments(query);

      return { monsters, totalMonsters };
    },

    async monster(_: any, { id }: MonsterArgs) {
      return Monster.findById(id).populate({
        path: 'reviews.user',
        select: 'id userName',
      });
    },
  },

  Mutation: {
    async fetchAllData() {
      await fetchData();
      return 'Data fetched and stored successfully!';
    },

    async addReview(_: any, { monsterId, review }: { monsterId: string; review: ReviewInput }) {
      const monster = await Monster.findById(monsterId);
      if (!monster) throw new Error('Monster not found');

      const user = await User.findById(review.user);
      if (!user) throw new Error('User not found');

      const fullReview = {
        user: user._id,
        difficulty: review.difficulty,
        description: review.description,
        createdAt: new Date().toISOString(),
      };

      monster.reviews.push(fullReview);
      await monster.save();

      return Monster.findById(monsterId).populate({
        path: 'reviews.user',
        select: 'id userName',
      });
    },

    async deleteReview(_: any, { monsterId, reviewId }: { monsterId: string; reviewId: string }) {
      try {
        const monster = await Monster.findById(monsterId);
        if (!monster) throw new Error('Monster not found');

        const reviewIndex = monster.reviews.findIndex((review) => review._id.toString() === reviewId);
        if (reviewIndex === -1) throw new Error('Review not found');

        monster.reviews.splice(reviewIndex, 1);
        await monster.save();

        return Monster.findById(monsterId).populate({
          path: 'reviews.user',
          select: 'id userName',
        });
      } catch (error) {
        console.error('Error in deleteReview resolver:', error);
        throw error;
      }
    },

    async updateReview(_: any, { monsterId, reviewId, review }: {
      monsterId: string;
      reviewId: string;
      review: ReviewInput;
    }) {
      const monster = await Monster.findById(monsterId);
      if (!monster) throw new Error('Monster not found');

      const reviewToUpdate = monster.reviews.id(reviewId);
      if (!reviewToUpdate) throw new Error('Review not found');

      reviewToUpdate.difficulty = review.difficulty;
      reviewToUpdate.description = review.description;

      await monster.save();

      return Monster.findById(monsterId)
        .populate({
          path: 'reviews.user',
          select: 'id userName',
        })
        .then((monster) => monster?.reviews.id(reviewId));
    },
  },
};
