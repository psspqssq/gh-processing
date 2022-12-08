import { gql } from "apollo-server";
import Area from "../../../db/models/Shop/Area";
// type Area machines and services should not have ID as reply
export const typeDefs = gql`
  extend type Query {
    areas: [Area]
    area(name: String!): Area
  }
  type Area {
    id: ID!
    name: String!
    location: String
    machines: [ID]
    services: [ID]
  }

  input AreaInput {
    id: ID
    name: String
    location: String
    machines: [ID]
    services: [ID]
  }
  extend type Mutation {
    CreateArea(area: AreaInput): Area
    UpdateArea(machines: AreaInput): Area
  }
`;

export const resolvers = {
  Query: {
    areas: () => {
      return Area.find({});
    },
    area: (root, args) => {
      return Area.findOne({ name: args.name });
    },
  },

  Mutation: {
    CreateArea: (root, args) => {
      return new Promise((resolve, reject) => {
        Area.create({ ...args.area })
          .then((result) => {
            Area.findById(result._id)
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
    UpdateArea: (root, args) => {
      return new Promise((resolve, reject) => {
        console.log(args);
        Area.findByIdAndUpdate(
          args.machines.id,
          { machines: args.machines.machines },
          { new: true }
        ).then((results) => {
          resolve(results);
        });
      });
    },
  },
};
