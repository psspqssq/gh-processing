import { gql } from "apollo-server"
import Service from "../../db/models/Shop/Service"

export const typeDefs = gql`
  extend type Query {
    service: [Service]
  }
  extend type Mutation {
    CreateService(service: ServiceInput): Service
  }
  type Service {
    id: ID!
    subject: String
  }
  input ServiceInput {
    name: String
  }
`
export const resolvers = {
  Query: {
    service: () => {
      return Service.find({})
    },
  },
  Mutation: {
    CreateService: (root, args) => {
      return new Promise((resolve, reject) => {
        Service.insertMany({
          name: args.service.name,
        }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
