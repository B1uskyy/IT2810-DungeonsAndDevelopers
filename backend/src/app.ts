import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers/index.ts';
import typeDefs from './graphql/typeDefs/index.ts';
import fetchData from './scripts/fetchData.ts';

const app = express();
app.use(express.json());

/**
 * Setup of mongodb connection with GraphQL, starts backend server.
 *
 */

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true,
  })
);

const MONGODBURLPROFILE =
  'mongodb://admin:adminpassordetditt@it2810-20.idi.ntnu.no:27017/Profile?directConnection=true&authSource=admin&appName=mongosh+2.3.2';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODBURLPROFILE)
  .then(() => {
    console.log('MongoDB connection established');

    server.start().then(() => {
      app.use('/graphql', expressMiddleware(server));

      app.listen(4000, () => {
        console.log('Server is running at http://localhost:4000/graphql');
        fetchData()
          .then(() => console.log('Data fetching complete'))
          .catch((error) => console.error('Error fetching data:', error));
      });
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await mongoose.connection.close();
  process.exit(0);
});
