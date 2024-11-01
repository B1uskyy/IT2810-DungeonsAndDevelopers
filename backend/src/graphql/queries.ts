import { gql } from '@apollo/client';

export const GET_MONSTERS = gql`
    query GetMonsters($searchTerm: String, $offset: Int, $limit: Int, $types: [String!]) {
        monsters(searchTerm: $searchTerm, offset: $offset, limit: $limit, types: $types) {
            monsters {
                id
                name
                size
                type
                alignment
                hit_points
                image
            }
            totalMonsters
        }
    }
`;

export const GET_USER_DUNGEON = gql`
  query GetUserDungeon($userId: ID!) {
    user(id: $userId) {
      dungeonName
      favoritedMonsters {
        id
      }
    }
  }
`;

export const UPDATE_DUNGEON_NAME = gql`
  mutation UpdateDungeonName($userId: ID!, $dungeonName: String!) {
    updateDungeonName(userId: $userId, dungeonName: $dungeonName) {
      dungeonName
    }
  }
`;

export const GET_USER_FAVORITES = gql`
  query GetUserFavorites($userId: ID!) {
    user(id: $userId) {
      favoritedMonsters {
        id
        name
        size
        type
        alignment
        hit_points
        image
      }
    }
  }
`;

export const ADD_FAVORITE_MONSTER = gql`
  mutation AddFavoriteMonster($userId: ID!, $monsterId: ID!) {
    addFavoriteMonster(userId: $userId, monsterId: $monsterId) {
      favoritedMonsters {
        id
      }
    }
  }
`;

export const REMOVE_FAVORITE_MONSTER = gql`
  mutation RemoveFavoriteMonster($userId: ID!, $monsterId: ID!) {
    removeFavoriteMonster(userId: $userId, monsterId: $monsterId) {
      favoritedMonsters {
        id
      }
    }
  }
`;

export const GET_MONSTER_REVIEWS = gql`
  query GetMonsterReviews($monsterId: ID!) {
    monster(id: $monsterId) {
      reviews {
        id
        user {
          id
          userName
        }
        difficulty
        description
        createdAt
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($monsterId: ID!, $review: ReviewInput!) {
    addReview(monsterId: $monsterId, review: $review) {
      reviews {
        user {
          id
          userName
        }
        difficulty
        description
        createdAt
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($monsterId: ID!, $reviewId: ID!) {
    deleteReview(monsterId: $monsterId, reviewId: $reviewId) {
      reviews {
        id
        user {
          id
          userName
        }
        difficulty
        description
        createdAt
      }
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($monsterId: ID!, $reviewId: ID!, $review: ReviewInput!) {
    updateReview(monsterId: $monsterId, reviewId: $reviewId, review: $review) {
      id
      user {
        id
        userName
      }
      difficulty
      description
      createdAt
    }
  }
`;

export const CHECK_USERNAME = gql`
    query checkUsername($userName: String!) {
        checkUsername(userName: $userName)
    }
`;

export const GET_USER_EQUIPMENT = gql`
  query GetUserEquipment($userId: ID!) {
    user(id: $userId) {
      id
      equipments {
        id
        index
        name
        category
        value
      }
    }
  }
`;

export const ADD_EQUIPMENT_TO_CHARACTER = gql`
  mutation AddEquipmentToCharacter($userId: ID!, $equipmentId: ID!) {
    addEquipmentToCharacter(userId: $userId, equipmentId: $equipmentId) {
      id
      equipments {
        id
        index
        name
        category
        value
      }
    }
  }
`;

export const REMOVE_EQUIPMENT_FROM_CHARACTER = gql`
  mutation RemoveEquipmentFromCharacter($userId: ID!, $equipmentId: ID!) {
    removeEquipmentFromCharacter(userId: $userId, equipmentId: $equipmentId) {
      id
      equipments {
        id
        index
        name
        category
        value
      }
    }
  }
`;

export const CREATE_USER = gql`
    mutation createUser($userName: String!) {
        createUser(userName: $userName) {
            token
            user {
                id
                userName
                class {
                    name
                }
                race {
                    name
                }
                abilityScores
                equipments {
                    name
                }
            }
    }
  }
`;

export const LOGIN_USER = gql`
    mutation loginUser($userName: String!) {
        loginUser(userName: $userName) {
            token
            user {
                id
                userName
                class {
                    name
                }
                race {
                    name
                }
                abilityScores
                equipments {
                    name
                }
            }
    }
  }
`;
export const UPDATE_USER_CLASS = gql`
    mutation UpdateUserClass($userId: ID!, $classId:ID!){
        updateUserClass(userId:$userId, classId: $classId){
            id
            class{
                name
                index
                hit_die
            }
        }
    }
`;

export const UPDATE_ABILITY_SCORES = gql`
    mutation UpdateAbilityScores($userId: ID!, $scores: [Int!]!) {
        updateAbilityScores(userId: $userId, scores: $scores) {
            id
            abilityScores
        }
    }
`;



export const GET_USER_CLASS = gql`
    query GetUserClass($userId: ID!) {
        user(id: $userId) {
            class {
                id
                name
                index
                hit_die
            }
        }
    }
`;
//Chatgpt prompt from line 225-230
export const GET_ARRAY_SCORES = gql`
    query GetArrayScores($userId: ID!) {
        getArrayScores(userId: $userId)
    }
`;

export const UPDATE_USER_RACE = gql`
    mutation UpdateUserRace($userId: ID!, $raceId: ID!) {
        updateUserRace(userId: $userId, raceId: $raceId) {
            id
            race {
                name
                speed
                alignment
                size
                img
            }
        }
    }
`;

export const GET_RACES = gql`
    query GetRaces($offset: Int, $limit: Int) {
        races(offset: $offset, limit: $limit) {
            races {
                id
                index
                name
                speed
                alignment
                size
                img
            }
            totalRaces
        }
    }
`;

export const GET_USER_RACE = gql`
    query GetUserRace($userId: ID!) {
        user(id: $userId) {
            id
            race {
                id
                name
                speed
                alignment
                size
                img
            }
        }
    }
`;

export const GET_ABILITYSCORES = gql`
    query GetAbilityScores($offset: Int, $limit: Int) {
        abilities(offset: $offset, limit: $limit) {
            abilities {
                index
                name
                skills               
            }
            totalAbilities
        }
    }
`;

export const GET_CLASSES = gql`
    query GetClasses($offset: Int, $limit: Int) {
        classes(offset: $offset, limit: $limit) {
            classes {
                id
                index
                name
                hit_die
                skills
            }
            totalClasses
        }
    }
`;