import { gql } from "apollo-server";
import Supplier from "../../../db/models/Shop/Supplier";

export const typeDefs = gql`
  extend type Query {
    suppliers: [Supplier]
  }
  extend type Mutation {
    CreateSupplier(supplier: SupplierInput): Supplier
  }
  type Supplier {
    id: ID!
    name: String
    address: String
    phone: String
    contacts: [ID]
    machines: [ID]
    parts: [ID]
  }
  input SupplierInput {
    type: Int
    name: String
    address: String
    phone: String
    contacts: [ID]
    machines: [ID]
    parts: [ID]
  }
`;
export const resolvers = {
  Query: {
    suppliers: () => {
      return Supplier.find({});
    },
  },
  Mutation: {
    CreateSupplier: (root, args) => {
      return new Promise((resolve, reject) => {
        Supplier.insertMany({
          ...args.supplier,
        }).then((results) => {
          resolve(results);
        });
      });
    },
  },
};
