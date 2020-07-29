import { gql } from "apollo-server"
import Area from "../../../db/models/Shop/Area"

export const typeDefs = gql`
  extend type Query {
    areas: [Area]
  }
  type Area {
    id: ID!
    name: String!
    location: String
    machines: [Machine]
    services: [Service]
  }

  input AreaInput {
    name: String!
    location: String
    machines: [String]
    services: [String]
  }
  extend type Mutation {
    CreateArea(area: AreaInput): Area
  }
`

export const resolvers = {
  Query: {
    areas: () => {
      return Area.find({}).populate("machines services")
    },
  },

  Mutation: {
    CreateArea: (root, args) => {},
  },
}
