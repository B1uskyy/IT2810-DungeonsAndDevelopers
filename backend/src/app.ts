import express from 'express';
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import cors from 'cors';

import typeDefs from './graphql/typeDefs/index.ts';
import resolvers from './graphql/resolvers/index.ts';
import fetchData from './scripts/fetchData.ts';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const MONGODBURLPROFILE = 'mongodb://admin:adminpassordetditt@it2810-20.idi.ntnu.no:27017/Profile?directConnection=true&authSource=admin&appName=mongosh+2.3.2';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(MONGODBURLPROFILE)
  .then(() => {
    console.log('MongoDB connection established');
    
    server.listen({ port: 4000 }).then(({ url }) => {
      console.log(`Server is running at ${url}`);

      fetchData()
        .then(() => console.log('Data fetching complete'))
        .catch((error) => console.error('Error fetching data:', error));
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });