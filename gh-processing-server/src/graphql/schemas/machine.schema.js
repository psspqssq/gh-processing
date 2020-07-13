import { gql } from "apollo-server"
import Machine from "../../db/models/Shop/Machine"
export const typeDefs = gql`
  extend type Query {
    machines: [Machine]
  }
  type Machine {
    id: ID!
    name: String!
  }
  input MachineInput {
    name: String!
  }
  extend type Mutation {
    CreateMachine(machine: MachineInput): [Machine]
  }
`
export const resolvers = {
  Query: {
    machines: () => {
      return Machine.find({})
    },
  },
  Mutation: {
    CreateMachine: (root, args) => {
      return new Promise((resolve, reject) => {
        Machine.insertMany({
          name: args.machine.name,
        }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
