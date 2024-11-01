import { gql } from 'apollo-server';
import { abilityType } from './abilityType.ts';
import { classType } from './classType.ts';
import { equipmentType } from './equipmentType.js';
import { monsterType } from './monsterType.ts';
import { raceType } from './raceType.ts';
import { userType } from './userType.ts';

const baseType = gql`
  type Query
  type Mutation {
    fetchAllData: String!
  }
`;

export default [baseType, classType, monsterType, raceType, userType, abilityType, equipmentType];
