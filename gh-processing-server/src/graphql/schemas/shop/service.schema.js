import { gql } from "apollo-server"
import Service from "../../../db/models/Shop/Service"

export const typeDefs = gql`
  extend type Query {
    service: [Service]
  }
  extend type Mutation {
    CreateService(service: ServiceInput): Service
  }
  type Service {
    id: ID!
    type: Int
    date: String
    subject: String
    body: String
    completeddate: String
    machines: [Machine]
    areas: [Area]
    parts: [Part]
    notes: [Note]
    users: [User]
  }
  input ServiceInput {
    type: Int
    date: String
    subject: String
    body: String
    completeddate: String
    machines: [Machine]
    areas: [Area]
    parts: [Part]
    notes: [Note]
    users: [User]
  }
`
export const resolvers = {
  Query: {
    service: () => {
      return Service.find({}).populate("machines areas parts notes users")
    },
  },
  Mutation: {
    CreateService: (root, args) => {
      return new Promise((resolve, reject) => {
        Service.insertMany({
          ...args.service,
        }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
