import { gql } from "apollo-server"
import Machine from "../../../db/models/Shop/Machine"
export const typeDefs = gql`
  extend type Query {
    machines: [Machine]
    machine(name: String!): Machine
  }
  type Machine {
    id: ID!
    name: String!
    details: String
    model: String
    serialnumber: String
    brand: Brand
    notes: [Note]
    areas: [Area]
    services: [Service]
    suppliers: [Supplier]
    parts: [Part]
  }

  input MachineInput {
    name: String!
    details: String
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
      return Machine.find({}).populate("brand notes areas services suppliers parts")
    },
    machine: (root, args) => {
      return Machine.findOne({ name: args.name })
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
