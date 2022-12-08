import { gql } from "apollo-server";
import User from "../../../db/models/Shop/User";

export const typeDefs = gql`
  extend type Query {
    users: [User]
  }
  extend type Mutation {
    CreateUser(user: UserInput): User
  }
  type User {
    id: ID!
    name: String
    lastname: String
    type: Int
    email: String
    phone: String
    services: [ID]
    notes: [ID]
    orders: [ID]
  }
  input UserInput {
    name: String
    lastname: String
    type: Int
    email: String
    phone: String
    services: [ID]
    notes: [ID]
    orders: [ID]
  }
`;
export const resolvers = {
  Query: {
    users: () => {
      return User.find({});
    },
  },
  Mutation: {
    CreateUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.insertMany({
          ...args.user,
        }).then((results) => {
          resolve(results);
        });
      });
    },
  },
};
