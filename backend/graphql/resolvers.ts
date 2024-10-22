const Player = require('../model/Player.js');

module.exports = {
  Query: {
    async player(_, {ID}){
      return await Player.findById(ID)
    },
    async getPlayer(_, {amount}){
      return await Player.find().limit(amount)
    }
  },
  Mutation: {
    async createPlayer(_, {playerInput: {username, userID ,characterName, characterClass, race, abilityScores}}){
      const createdPlayer = new Player({
        username: username,
        userID: userID,
        characterName: characterName,
        characterClass: characterClass,
        race: race,
        abilityScores: [abilityScores[0]],
      });
      const res = await createdPlayer.save();
      return {
        id : res.id,
        ...res._doc
      }
    },
    async deletePlayer(_, {ID}){
      const deleted = (await Player.deleteOne({
        _id: ID,
      })).deletedCount
      return deleted
    },
    async editPlayer(_, {ID}, {playerInput: {username, userID ,characterName, characterClass, race, abilityScores}}){
      const wasEdited = (await Player.updateOne({_id: ID},
        {
          username: username,
        userID: userID,
        characterName: characterName,
        characterClass: characterClass,
        race: race,
          abilityScores: abilityScores
        } )).modifiedCount;
      return wasEdited;
    }

  }
}