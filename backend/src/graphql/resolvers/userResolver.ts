import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Class from '../model/Class.js';
import Race from '../model/Race.js';
import User from '../model/User.ts';

const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';

interface UserArgs {
  userName: string;
}

export default {
  Query: {
    async user(_: any, { id }: { id: string }) {
      return User.findById(id)
        .select('dungeonName')
        .populate({
          path: 'favoritedMonsters',
          select: '_id name size type alignment hit_points image',
        })
        .populate('race')
        .populate('class')
        .populate('equipments');
    },

    async checkUsername(_: any, { userName }: UserArgs) {
      const existingUser = await User.findOne({ userName });
      return !existingUser;
    },

    async getArrayScores(_: any, { userId }: { userId: string }) {
      const user = await User.findById(userId).select('abilityScores');
      if (!user) throw new Error('User not found');
      return user.abilityScores;
    },


  },

  Mutation: {
    async createUser(_: any, { userName }: UserArgs) {
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        throw new Error('Username is already taken');
      }

      const defaultRace = await Race.findOne({ index: 'human' });
      const defaultClass = await Class.findOne({ index: 'barbarian' });

      if (!defaultRace || !defaultClass) {
        throw new Error('Default race or class not found in the database');
      }

      const user = new User({
        userName,
        race: defaultRace._id,
        class: defaultClass._id,
      });

      await user.save();

      const token = jwt.sign({ id: user._id, userName: user.userName }, SECRET_KEY, { expiresIn: '2h' });

      return { user: await user.populate('race class'), token };
    },

    async loginUser(_: any, { userName }: UserArgs) {
      const user = await User.findOne({ userName }).populate('race').populate('class').populate('favoritedMonsters');
      if (!user) throw new Error('User not found');

      const token = jwt.sign({ id: user._id, userName: user.userName }, SECRET_KEY, { expiresIn: '2h' });

      return { user, token };
    },

    async addFavoriteMonster(_: any, { userId, monsterId }: { userId: string; monsterId: string }) {
      const user = await User.findById(userId).populate('favoritedMonsters');
      if (!user) throw new Error('User not found');

      const monsterObjectId = new mongoose.Types.ObjectId(monsterId);

      if (!user.favoritedMonsters.some((fav) => fav._id.equals(monsterObjectId))) {
        user.favoritedMonsters.push(monsterObjectId);
        await user.save();
      }

      return user.populate('favoritedMonsters');
    },

    async removeFavoriteMonster(_: any, { userId, monsterId }: { userId: string; monsterId: string }) {
      const user = await User.findById(userId).populate('favoritedMonsters');
      if (!user) throw new Error('User not found');

      const monsterObjectId = new mongoose.Types.ObjectId(monsterId);

      user.favoritedMonsters.pull(monsterObjectId);
      await user.save();

      return user.populate('favoritedMonsters');
    },

    async updateDungeonName(_: any, { userId, dungeonName }: { userId: string; dungeonName: string }) {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      user.dungeonName = dungeonName;
      await user.save();

      return user;
    },

    async updateUserRace(_: any, { userId, raceId }: { userId: string; raceId: string }) {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      const race = await Race.findById(raceId);
      if (!race) throw new Error('Race not found');

      user.race = race._id;
      await user.save();

      return user.populate('race');
    },

    async updateUserClass(_: any, { userId, classId }: { userId: string; classId: string }) {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      const playerClass = await Class.findById(classId);
      if (!playerClass) throw new Error('Class not found');

      user.class = playerClass._id;
      await user.save();

      return user.populate('class');
    },
    async addEquipmentToCharacter(_: any, { userId, equipmentId }: { userId: string; equipmentId: string }) {
      const user = await User.findById(userId).populate('equipments');
      if (!user) throw new Error('User not found');

      const equipmentObjectId = new mongoose.Types.ObjectId(equipmentId);

      if (!user.equipments.some((equip) => equip._id.equals(equipmentObjectId))) {
        user.equipments.push(equipmentObjectId);
        await user.save();
      }
      return user.populate('equipments');
    },

    async updateAbilityScores(_: any, { userId, scores }: { userId: string; scores: number[] }) {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      if (scores.length !== 6) {
        throw new Error('Ability scores array must have exactly 6 elements');
      }

      user.abilityScores = scores;
      await user.save();

      return user.populate('race class');
    },
    

    async removeEquipmentFromCharacter(_: any, { userId, equipmentId }: { userId: string; equipmentId: string }) {
      const user = await User.findById(userId).populate('equipments');
      if (!user) throw new Error('User not found');

      const equipmentObjectId = new mongoose.Types.ObjectId(equipmentId);


      user.equipments = user.equipments.filter((equip) => !equip._id.equals(equipmentObjectId));

      await user.save();
      return user.populate('equipments');
    },
  },
};
