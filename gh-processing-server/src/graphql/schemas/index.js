import { gql } from "apollo-server";
import { merge } from "lodash";
import loadSchemas from "../loadschemas";
import { makeExecutableSchema } from "apollo-server";

let exports = loadSchemas("shop", "watersystem");

const Query = gql`
  type Query {
    _empty: String
  }
`;
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;
let resolvers = {
  ID: (obj) => obj._id,
};
let typeDefsArray = [Query, Mutation];
Object.keys(exports).forEach((item) => {
  if (item == "default") return;
  if (exports[item].typeDefs != undefined) {
    typeDefsArray = [...typeDefsArray, exports[item].typeDefs];
  }
  if (exports[item].resolvers != undefined) {
    resolvers = merge(resolvers, exports[item].resolvers);
  }
});

const schema = makeExecutableSchema({
  typeDefs: typeDefsArray,
  resolvers: resolvers,
});

export default schema;
