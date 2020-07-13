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
import { typeDefs as area, resolvers as areaResolvers } from "./area.schema"
import {
  typeDefs as machine,
  resolvers as machineResolvers,
} from "./machine.schema"
import {
  typeDefs as service,
  resolvers as serviceResolvers,
} from "./service.schema"

import { makeExecutableSchema } from "apollo-server"

const Query = gql`
  type Query {
    _empty: String
  }
`
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`

const resolvers = {}

const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Mutation,
    boilerWaterTest,
    coolerWaterTest,
    area,
    machine,
    service,
  ],
  resolvers: merge(
    resolvers,
    boilerWaterTestResolvers,
    coolerWaterTestResolvers,
    areaResolvers,
    machineResolvers,
    serviceResolvers
  ),
})

export default schema
