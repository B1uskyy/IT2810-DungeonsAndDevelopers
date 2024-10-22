import { gql } from 'apollo-server';

module.exports = gql`
  type Player{
    username: String!
    userID: Int!
    characterName: String!
    characterClass: String!
    race: String!
    abilityScores: [Int!]!
   }
    
   input PlayerInput {
     username: String!
     userID: Int!
     characterName: String!
     characterClass: String!
     race: String!
     abilityScores: [Int!]!
   }
    
   input EditPlayerInput {
     username: String!
     userID: Int!
     characterName: String!
     characterClass: String!
     race: String!
     abilityScores: [Int!]!
   }
   
   type Query {
     player(ID: ID!): Player!
     getPlayer(amount: Int): [Player]
   }
    
   type Mutation {
    createPlayer(playerInput: PlayerInput): Player!
    deletePlayer(ID: ID!): Boolean
    editPlayer(ID: ID!, editRecipeInput: EditPlayerInput): Boolean
  }
    
    
  type Monster {
    name: String!
    size: String!
    type: String!
    alignment: String!
    hit_points: Int!
    hit_dice: String!
    strength: Int!
    dexterity: Int!
    intelligence: Int!
    wisdom: Int!
    charisma: Int!
    image: String!
  }
  type Ability {
    name: String!
    score: Int!
  }
  type Character {
    name: String!
    class: String!
    race: String!
    abilityScores: [Ability!]!
  }
  type User {
    userName: String!
    userID: ID!
    character: Character!
  }

  type Query {
    user(id: ID!): User!
    monster(id: String!): Monster!
  }
`;
