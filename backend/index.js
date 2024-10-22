import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from '@neo4j/graphql';
import neo4j from 'neo4j-driver';
import axios from 'axios';

const typeDefs = `
  type Monster {
    name: String!
    hit_points: Int!
    size: String!
    alignment: String!
    image: String
  }

  type Query {
    monster(index: String!): Monster
  }
`;

const driver = neo4j.driver('bolt://localhost:7800', neo4j.auth.basic('admin', 'admin'));

const resolvers = {
  Query: {
    monster: async (_, { index }) => {
      try {
        const response = await axios.get(`https://www.dnd5eapi.co/api/monsters/${index}/`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to get data');
      }
    },
  },
};

const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });

const schema = await neoSchema.getSchema();
const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at ${url}`);
