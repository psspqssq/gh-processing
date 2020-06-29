import { gql } from "apollo-server"

const typeDefs = gql`
  type BoilerWaterTest {
    id: ID!
    type: Int!
    date: String!
    time: String!
    testedby: String!
    data: BoilerWaterTestData!
  }
  type BoilerWaterTestData {
    softener: SoftenerTestData
    feedwater: FeedWaterData
    boiler: BoilerData
    condensate: CondensateData
  }
  type SoftenerTestData {
    totalhardness: Float
    conductivity: Float
    ph: Float
  }

  type FeedWaterData {
    totalhardness: Float
    conductivity: Float
    ph: Float
    temperature: Float
  }

  type BoilerData {
    id: Int
    ohalkalinity: Float
    sulfite: Float
    conductivity: Float
    ph: Float
    blowdown: Boolean
  }
`
export default typeDefs
