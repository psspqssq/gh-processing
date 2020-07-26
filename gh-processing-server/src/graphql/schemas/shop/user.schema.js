import { gql } from "apollo-server"
import User from "../../../db/models/Shop/User"

export const typeDefs = gql`
  extend type Query {
    user: [User]
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
    services: [Service]
    notes: [Note]
    orders: [Order]
  }
  input UserInput {
    name: String
    lastname: String
    type: Int
    email: String
    phone: String
    services: [Service]
    notes: [Note]
    orders: [Order]
  }
`
export const resolvers = {
  Query: {
    user: () => {
      return User.find({}).populate("services notes orders")
    },
  },
  Mutation: {
    CreateUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.insertMany({
          ...args.user,
        }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
