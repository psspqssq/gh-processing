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
  input MachineUpdateInput {
    id: ID
    name: String
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
    UpdateMachine(machine: MachineUpdateInput): Machine
  }
`;
export const resolvers = {
  Query: {
    machines: () => {
      return Machine.find({}).populate(
        "brands notes areas service suppliers parts"
      );
    },
    machine: (root, args) => {
      return Machine.findOne({ name: args.name }).populate(
        "brands notes areas service suppliers parts"
      );
    },
  },
  Mutation: {
    CreateMachine: (root, args) => {
      return new Promise((resolve, reject) => {
        Machine.create({ ...args.machine })
          .then((result) => {
            Machine.findById(result._id)
              .populate("areas")
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
    UpdateMachine: (root, args) => {
      return new Promise((resolve, reject) => {
        Machine.findByIdAndUpdate(
          args.machine.id,
          {
            ...args.machine,
          },
          { new: true }
        )
          .populate("brands notes areas service suppliers parts")
          .then((results) => {
            resolve(results);
          });
      });
    },
  },
};
