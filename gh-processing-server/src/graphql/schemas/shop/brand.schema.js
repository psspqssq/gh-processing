import { gql } from "apollo-server"
import Brand from "../../../db/models/Shop/Brand"
export const typeDefs = gql`
  extend type Query {
    brands: [Brand]
    brand(name: String!): Brand
  }
  type Brand {
    id: ID!
    name: String
    contacts: [Contact]
    machines: [Machine]
    parts: [Part]
  }
  input BrandInput {
    name: String
    contacts: [ID]
    machines: [ID]
    parts: [ID]
  }
  extend type Mutation {
    CreateBrand(brand: BrandInput): [Brand]
  }
`
export const resolvers = {
  Query: {
    brands: () => {
      return Brand.find({}).populate("contacts machines parts")
    },
    brand: (root, args) => {
      return Brand.findOne({ name: args.name })
    },
  },

  Mutation: {
    CreateBrand: (root, args) => {
      return new Promise((resolve, reject) => {
        Brand.insertMany({ ...args.brand }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
