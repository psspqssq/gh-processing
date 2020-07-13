import { gql } from "apollo-server"
import Service from "../../db/models/Shop/Service"

export const typeDefs = gql`
  extend type Query {
    service: [Service]
  }
  type Service {
    id: ID!
    subject: String
  }
`
export const resolvers = {
  Query: {
    service: () => {
      return Service.find({})
    },
  },
}
