import { gql } from 'apollo-server';

export const userType = gql`

  type UserEquipments {
    equipments: [Equipment!]
  }
  
  type User {
    id: ID!
    userName: String!
    class: Class!
    race: Race!
    abilityScores: [Int!]!
    equipments: [Equipment]!
    favoritedMonsters: [Monster!]!
    dungeonName: String!
    }

  type AuthPayload {
    token: String!
    user: User!
  }

  type AddEquipmentToCharacterResult {
    user: User!
    equipments: [Equipment!]!
  }

    extend type Query {
        getUser(amount: Int): [User]
        checkUsername(userName: String!): Boolean!
        user(id: ID!): User!
        getArrayScores(userId: ID!): [Int!]!
    }

    extend type Mutation {
        createUser(userName: String!): AuthPayload!
        loginUser(userName: String!): AuthPayload!
        addFavoriteMonster(userId: ID!, monsterId: ID!): User!
        removeFavoriteMonster(userId: ID!, monsterId: ID!): User!
        updateDungeonName(userId: ID!, dungeonName: String!): User!
        updateUserRace(userId: ID!, raceId: ID!): User!
        updateUserClass(userId: ID!, classId: ID!): User!
        updateAbilityScores(userId: ID!, scores: [Int!]!): User!
        addEquipmentToCharacter(userId: ID!, equipmentId: ID!): User!
        removeEquipmentFromCharacter(userId: ID!, equipmentId: ID!): User!
    }
`;

