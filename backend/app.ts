import express = require('express');
import { ApolloServer } from 'apollo-server';
import mongoose = require('mongoose');
const app = express();
app.use(express.json());
const MONGODBURLPROFILE ='mongodb://admin:adminpassordetditt@it2810-20.idi.ntnu.no:27017/Profile?directConnection=true&authSource=admin&appName=mongosh+2.3.2'




const typeDefs = require('./graphql/typeDefs.ts')
const resolvers = require('./graphql/resolvers.ts')


const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect(MONGODBURLPROFILE)
.then(()=>{
  console.log(("mongoDB connection connected"))
  return server.listen({port: 5000})
  }
).then((result)=>{
  console.log(result.url)
})