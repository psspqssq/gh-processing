import { gql } from "apollo-server";
import Machine from "../../../db/models/Shop/Machine";
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
    notes: [ID]
    areas: [ID]
    services: [ID]
    suppliers: [ID]
    parts: [ID]
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
    CreateMachine(machine: MachineInput): Machine
  }
`;
export const resolvers = {
  Query: {
    machines: () => {
      return Machine.find({});
    },
    machine: (root, args) => {
      return Machine.findOne({ name: args.name });
    },
  },
  Mutation: {
    CreateMachine: (root, args) => {
      return new Promise((resolve, reject) => {
        Machine.create({ ...args.machine })
          .then((result) => {
            Machine.findById(result._id)
              .then((results) => {
                resolve(results).catch((error) => {
                  resolve(error);
                });
              })
              .catch((error) => {
                resolve(error);
              });
          })
          .catch((error) => {
            resolve(error);
          });
      }).catch((error) => {
        resolve(error);
      });
    },
  },
};
