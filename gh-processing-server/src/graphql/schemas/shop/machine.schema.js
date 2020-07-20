import { gql } from "apollo-server"
import Machine from "../../../db/models/Shop/Machine"
export const typeDefs = gql`
  extend type Query {
    machines: [Machine]
  }
  type Machine {
    id: ID!
    name: String!
    model: String
    serialnumber: String
    brand: ID
    notes: [ID]
    areas: [Area]
    services: [Service]
    suppliers: [ID]
    parts: [ID]
  }

  input MachineInput {
    name: String!
    model: String
    serialnumber: String
    brand: ID
    notes: [ID]
    areas: [ID]
    services: [ID]
    suppliers: [ID]
    parts: [ID]
  }
  extend type Mutation {
    CreateMachine(machine: MachineInput): [Machine]
  }
`
export const resolvers = {
  Query: {
    machines: () => {
      return Machine.find({}).populate("services")
    },
  },
  Mutation: {
    CreateMachine: (root, args) => {
      return new Promise((resolve, reject) => {
        Machine.insertMany({
          ...args.machine,
        }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
