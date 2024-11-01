import { gql } from 'apollo-server';

export const raceType = gql`
    type Race {
        id: ID!
        index: String!
        name: String!
        speed: Int!
        alignment: String!
        size: String!
        size_description: String!
        img: String
    }

    type RaceResult {
        races: [Race!]!
        totalRaces: Int!
    }

    extend type Query {
        races(offset: Int, limit: Int): RaceResult!
        race(id: ID!): Race!
    }

    extend type Mutation {
        fetchRaces: String!
    }
`;