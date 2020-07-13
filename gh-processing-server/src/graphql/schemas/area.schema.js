import { gql } from "apollo-server"
import Area from "../../db/models/Shop/Area"

export const typeDefs = gql`
  extend type Query {
    areas: [Area]
  }
  type Area {
    id: ID!
    name: String!
    location: String
    machines: [ID]
    services: [ID]
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
      return Area.find({})
    },
  },
  Mutation: {
    CreateArea: (root, args) => {
      return new Promise((resolve, reject) => {
        Area.insertMany({
          name: args.area.name,
          location: args.area.location,
        }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
