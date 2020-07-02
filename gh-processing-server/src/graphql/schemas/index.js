import { gql } from "apollo-server"
import { merge } from "lodash"
import {
  typeDefs as boilerWaterTest,
  resolvers as boilerWaterTestResolvers,
} from "./boilerWaterTest"
import {
  typeDefs as coolerWaterTest,
  resolvers as coolerWaterTestResolvers,
} from "./coolerWaterTest"
import { makeExecutableSchema } from "apollo-server"

const Query = gql`
  type Query {
    _empty: String
  }
`

const resolvers = {}

const schema = makeExecutableSchema({
  typeDefs: [Query, boilerWaterTest, coolerWaterTest],
  resolvers: merge(
    resolvers,
    boilerWaterTestResolvers,
    coolerWaterTestResolvers
  ),
})

export default schema
