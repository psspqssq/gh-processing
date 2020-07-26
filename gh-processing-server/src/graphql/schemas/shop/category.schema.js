import { gql } from "apollo-server"
import Category from "../../../db/models/Shop/Category"

export const typeDefs = gql`
  extend type Query {
    categories: [Category]
  }
  type Category {
    id: ID!
    name: String
    parts: [Part]
  }
  input CategoryInput {
    name: String
    parts: [ID]
  }
  extend type Mutation {
    CreateCategory(category: CategoryInput): [Category]
  }
`
export const resolvers = {
  Query: {
    categories: () => {
      return Category.find({}).populate("parts")
    },
  },

  Mutation: {
    CreateCategory: (root, args) => {
      return new Promise((resolve, reject) => {
        Category.insertMany({ ...args.category }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
