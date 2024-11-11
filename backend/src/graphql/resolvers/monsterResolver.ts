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
  minHp?: number;
  maxHp?: number;
  sortOption?: string;
  suggestionsOnly?: boolean;
}

interface ReviewInput {
  user: string;
  difficulty: number;
  description: string;
}

interface MonsterTypeCountsArgs {
  minHp?: number;
  maxHp?: number;
}

export default {
  Query: {
    async monsters(
      _: any,
      {
        searchTerm = '',
        offset = 0,
        limit = 8,
        types = [],
        minHp,
        maxHp,
        sortOption = 'name-asc',
        suggestionsOnly = false,
      }: MonsterQueryArgs
    ) {
      let query: any = {};
      let sort: any = {};

      if (types.length > 0) {
        query.type = { $in: types };
      }

      if (minHp !== undefined && maxHp !== undefined) {
        query.hit_points = { $gte: minHp, $lte: maxHp };
      }

      if (suggestionsOnly) {
        query.name = { $regex: new RegExp(`^${searchTerm}`, 'i') };
        return Monster.find(query, 'id name').limit(limit);
      }

      switch (sortOption) {
        case 'name-asc':
          sort.name = 1;
          break;
        case 'name-desc':
          sort.name = -1;
          break;
        case 'difficulty-asc':
        case 'difficulty-desc':
        case 'reviews-desc':
          const sortDirection = sortOption === 'difficulty-asc' ? 1 : sortOption === 'difficulty-desc' ? -1 : -1;

          const monstersWithCalculations = await Monster.aggregate([
            { $match: query },
            {
              $addFields: {
                averageDifficulty: {
                  $cond: {
                    if: { $gt: [{ $size: '$reviews' }, 0] },
                    then: { $avg: '$reviews.difficulty' },
                    else: null,
                  },
                },
                reviewsCount: { $size: '$reviews' },
              },
            },
            {
              $sort: sortOption.includes('difficulty') ? { averageDifficulty: sortDirection } : { reviewsCount: -1 },
            },
            { $skip: offset },
            { $limit: limit },
          ]);

          const totalMonsters = await Monster.countDocuments(query);

          const minHpValue = await Monster.findOne(query)
            .sort({ hit_points: 1 })
            .then((m) => m?.hit_points ?? 1);
          const maxHpValue = await Monster.findOne(query)
            .sort({ hit_points: -1 })
            .then((m) => m?.hit_points ?? 1000);

          return {
            monsters: monstersWithCalculations,
            totalMonsters,
            minHp: minHpValue,
            maxHp: maxHpValue,
          };
        default:
          sort.name = 1;
      }

      let monsters: any[] = [];
      let totalMonsters: number = 0;

      if (searchTerm) {
        const startsWithRegex = new RegExp(`^${searchTerm}`, 'i');
        const containsRegex = new RegExp(searchTerm, 'i');

        query.name = { $regex: startsWithRegex };
        monsters = await Monster.find(query).skip(offset).limit(limit);

        if (monsters.length < limit) {
          const remainingLimit = limit - monsters.length;
          query.name = { $regex: containsRegex };
          query._id = { $nin: monsters.map((m) => m._id) };

          const additionalMonsters = await Monster.find(query)
            .skip(offset + monsters.length)
            .limit(remainingLimit);

          monsters = [...monsters, ...additionalMonsters];
        }

        query.name = { $regex: containsRegex };
        totalMonsters = await Monster.countDocuments(query);
      } else {
        monsters = await Monster.find(query).skip(offset).limit(limit);
        totalMonsters = await Monster.countDocuments(query);
      }

      const minHpValue = await Monster.findOne(query)
        .sort({ hit_points: 1 })
        .then((m) => m?.hit_points ?? 1);
      const maxHpValue = await Monster.findOne(query)
        .sort({ hit_points: -1 })
        .then((m) => m?.hit_points ?? 1000);

      return { monsters, totalMonsters, minHp: minHpValue, maxHp: maxHpValue };
    },

    async monster(_: any, { id }: MonsterArgs) {
      return Monster.findById(id).populate({
        path: 'reviews.user',
        select: 'id userName',
      });
    },

    async monsterTypeCounts(_: any, { minHp, maxHp }: MonsterTypeCountsArgs) {
      const matchStage: Partial<{ hit_points: { $gte: number; $lte: number } }> = {};
      if (minHp !== undefined && maxHp !== undefined) {
        matchStage.hit_points = { $gte: minHp, $lte: maxHp };
      }

      return Monster.aggregate([
        { $match: matchStage },
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $project: { type: '$_id', count: 1, _id: 0 } },
      ]);
    },

    async monsterHpRange() {
      const minHpMonster = await Monster.findOne().sort({ hit_points: 1 });
      const maxHpMonster = await Monster.findOne().sort({ hit_points: -1 });

      return {
        minHp: minHpMonster?.hit_points || 1,
        maxHp: maxHpMonster?.hit_points || 1000,
      };
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

    async updateReview(
      _: any,
      {
        monsterId,
        reviewId,
        review,
      }: {
        monsterId: string;
        reviewId: string;
        review: ReviewInput;
      }
    ) {
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
