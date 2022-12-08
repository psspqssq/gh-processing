import { gql } from "apollo-server";
import Brand from "../../../db/models/Shop/Brand";
export const typeDefs = gql`
  extend type Query {
    brands: [Brand]
    brand(name: String!): Brand
  }
  type Brand {
    id: ID!
    name: String
    contacts: [ID]
    machines: [ID]
    parts: [ID]
  }
  input BrandInput {
    id: ID
    name: String
    contacts: [ID]
    machines: [ID]
    parts: [ID]
  }
  extend type Mutation {
    CreateBrand(brand: BrandInput): Brand
    UpdateBrand(machines: BrandInput): Brand
  }
`;
export const resolvers = {
  Query: {
    brands: () => {
      return Brand.find({});
    },
    brand: (root, args) => {
      return Brand.findOne({ name: args.name });
    },
  },

  Mutation: {
    CreateBrand: (root, args) => {
      return new Promise((resolve, reject) => {
        Brand.create({ ...args.brand })
          .then((result) => {
            Brand.findById(result._id)
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
    UpdateBrand: (root, args) => {
      return new Promise((resolve, reject) => {
        console.log(args);
        Brand.findByIdAndUpdate(
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
