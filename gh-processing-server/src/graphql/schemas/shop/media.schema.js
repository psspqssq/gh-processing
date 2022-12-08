import { gql } from "apollo-server";
import Media from "../../../db/models/Shop/Media";
export const typeDefs = gql`
  extend type Query {
    medias: [Media]
    media(address: String!): Media
  }
  type Media {
    id: ID!
    address: String
    type: Int
    machines: [Machine]
    parts: [Part]
    description: String
  }

  input MediaInput {
    id: ID
    address: String
    type: Int
    machines: [ID]
    parts: [ID]
    description: String
  }

  extend type Mutation {
    CreateMedia(media: MediaInput): Media
    UpdateMedia(machines: MediaInput): Media
  }
`;
export const resolvers = {
  Query: {
    medias: () => {
      return Media.find({}).populate("machines");
    },
    media: (root, args) => {
      return Media.findOne({ address: args.address });
    },
  },
  Mutation: {
    CreateMedia: (root, args) => {
      return new Promise((resolve, reject) => {
        Media.create({ ...args.media })
          .then((result) => {
            Media.findById(result._id)
              .populate("machines")
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
    UpdateMedia: (root, args) => {
      return new Promise((resolve, reject) => {
        console.log(args);
        Media.findByIdAndUpdate(
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
