import { gql } from "apollo-server";
import Contact from "../../../db/models/Shop/Contact";

export const typeDefs = gql`
  extend type Query {
    contacts: [Contact]
  }
  type Contact {
    id: ID!
    name: String
    phone: String
    brands: [ID]
    suppliers: [ID]
  }
  input ContactInput {
    name: String
    phone: String
    brands: [ID]
    suppliers: [ID]
  }
  extend type Mutation {
    CreateContact(contact: ContactInput): [Contact]
  }
`;

export const resolvers = {
  Query: {
    contacts: () => {
      return Contact.find({});
    },
  },

  Mutation: {
    CreateContact: (root, args) => {
      return new Promise((resolve, reject) => {
        Contact.insertMany({ ...args.contact }).then((results) => {
          resolve(results);
        });
      });
    },
  },
};
