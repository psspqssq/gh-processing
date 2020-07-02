import { gql } from "apollo-server"
import CoolerWaterTest from "../../db/models/CoolerWaterTest"

export const typeDefs = gql`
  extend type Query {
    coolerWaterTest: [CoolerWaterTest]
  }
  type CoolerWaterTest {
    id: ID!
    date: String!
    time: String!
    testedby: String!
    data: CoolerWaterTestData!
  }
  type CoolerWaterTestData {
    plantrawwater: PlantRawWaterData
    coolingtowers: [CoolingTowerData]
    glycolloop: [GlycolLoop]
  }
  type PlantRawWaterData {
    totalhardness: Float
    conductivity: Float
    ph: Float
  }
  type CoolingTowerData {
    area: String
    totalhardness: Float
    conductivity: Float
    ph: Float
    ptsa: Float
    freechlorine: Float
  }
  type GlycolLoop {
    area: String
    conductivity: Float
    ph: Float
    glycolpercent: Float
  }
`
export const resolvers = {
  Query: {
    coolerWaterTest: () => {
      return CoolerWaterTest.find({})
    },
  },
}
