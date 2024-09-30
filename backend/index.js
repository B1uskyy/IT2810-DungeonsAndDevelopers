// const express = require("express")
import { ApolloServer } from "@apollo/server"
import {startStandaloneServer} from '@apollo/server/standalone';
import {Neo4jGraphQL} from '@neo4j/graphql';
import neo4j from "neo4j-driver"

const typeDefs = `#graphql
    type Monster {
        name: String
    }


    type Monsters {
        favoritesName: String,
        monsters: [Monster]
    }


`;