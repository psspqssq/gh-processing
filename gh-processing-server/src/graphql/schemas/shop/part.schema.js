import { gql } from "apollo-server"
import Part from "../../../db/models/Shop/Part"
export const typeDefs = gql`
  extend type Query {
    parts: [Part]
  }
  type Part {
    id: ID!
    partnumber: String!
    description: String
    availablestock: Float
    location: String
    reorderlevel: Float
    discontinued: Boolean
    serialnumber: String
    model: String
    price: Float
    code: String
    brand: Brand
    notes: [Note]
    machines: [Machine]
    services: [Service]
    categories: [Category]
    orders: [Order]
    suppliers: [Supplier]
    medias: [Media]
  }

  input PartInput {
    partnumber: String!
    description: String
    availablestock: Float
    location: String
    reorderlevel: Float
    discontinued: Boolean
    serialnumber: String
    model: String
    price: Float
    code: String
    brand: ID
    notes: [ID]
    machines: [ID]
    services: [ID]
    categories: [ID]
    orders: [ID]
    suppliers: [ID]
    medias: [ID]
  }

  extend type Mutation {
    CreatePart(part: PartInput): [Part]
  }
`
export const resolvers = {
  Query: {
    parts: () => {
      return Part.find({}).populate("brand notes machines services categories orders suppliers medias")
    },
  },
  Mutation: {
    CreatePart: (root, args) => {
      return new Promise((resolve, reject) => {
        Part.insertMany({
          ...args.part,
        }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
