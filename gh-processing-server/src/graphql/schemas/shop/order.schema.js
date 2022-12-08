import { gql } from "apollo-server";
import Order from "../../../db/models/Shop/Order";
export const typeDefs = gql`
  extend type Query {
    orders: [Order]
  }
  type Order {
    id: ID!
    quantity: Int
    date: String
    arrived: Boolean
    arriveddate: String
    receivedquantity: Int
    backorder: Float
    user: ID
    part: ID
  }

  input OrderInput {
    quantity: Int
    date: String
    arrived: Boolean
    arriveddate: String
    receivedquantity: Int
    backorder: Float
    user: ID
    part: ID
  }

  extend type Mutation {
    CreateOrder(order: OrderInput): [Order]
  }
`;
export const resolvers = {
  Query: {
    orders: () => {
      return Order.find({});
    },
  },
  Mutation: {
    CreateOrder: (root, args) => {
      return new Promise((resolve, reject) => {
        Order.insertMany({
          ...args.order,
        }).then((results) => {
          resolve(results);
        });
      });
    },
  },
};
