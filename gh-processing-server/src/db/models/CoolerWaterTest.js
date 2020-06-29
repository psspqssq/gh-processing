import mongoose from "mongoose"
export const coolerWaterTestSchema = new mongoose.Schema({
    type: Int!
    date: String!
    time: String!
    testedby: String!
    data: CoolerWaterTestData!
})

const typeDefs = gql`
  type CoolerWaterTest {
    id: ID!
    type: Int!
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
export default typeDefs
