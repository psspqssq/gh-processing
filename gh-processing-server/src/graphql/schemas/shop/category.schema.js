import { gql } from "apollo-server";
import Category from "../../../db/models/Shop/Category";

export const typeDefs = gql`
  extend type Query {
    categories: [Category]
  }
  type Category {
    id: ID!
    name: String
    parts: [Part]
  }
  input CategoryInput {
    name: String
    parts: [ID]
  }
  extend type Mutation {
    CreateCategory(category: CategoryInput): Category
  }
`;
export const resolvers = {
  Query: {
    categories: () => {
      return Category.find({});
    },
  },

  Mutation: {
    CreateCategory: (root, args) => {
      return new Promise((resolve, reject) => {
        Category.create({ ...args.category })
          .then((result) => {
            Category.findById(result._id)
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
