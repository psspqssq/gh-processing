import { gql } from "apollo-server";
import Service from "../../../db/models/Shop/Service";

export const typeDefs = gql`
  extend type Query {
    services: [Service]
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
    machines: [ID]
    areas: [ID]
    parts: [ID]
    notes: [ID]
    users: [ID]
  }
`;
export const resolvers = {
  Query: {
    services: () => {
      return Service.find({});
    },
  },
  Mutation: {
    CreateService: (root, args) => {
      return new Promise((resolve, reject) => {
        Service.insertMany({
          ...args.service,
        }).then((results) => {
          resolve(results);
        });
      });
    },
  },
};
