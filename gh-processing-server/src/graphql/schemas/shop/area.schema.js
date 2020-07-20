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
    machines: [ID]
    services: [ID]
  }
  extend type Mutation {
    CreateArea(area: AreaInput): [Area]
  }
`

export const resolvers = {
  Query: {
    areas: () => {
      return Area.find({}).populate({
        path: "machines services",
        populate: { path: "areas services" },
      })
    },
  },

  Mutation: {
    CreateArea: (root, args) => {
      return new Promise((resolve, reject) => {
        Area.insertMany({ ...args.area }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
