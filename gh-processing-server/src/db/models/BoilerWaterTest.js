import mongoose from "mongoose"

export const BoilerData = new mongoose.Schema({
  id: Number,
  ohalkalinity: Number,
  sulfite: Number,
  conductivity: Number,
  ph: Number,
  blowdown: Boolean,
})
export const CondensateData = new mongoose.Schema({
  totalhardness: Number,
  conductivity: Number,
  ph: Number,
})
export const FeedWaterData = new mongoose.Schema({
  totalhardness: Number,
  conductivity: Number,
  ph: Number,
  temperature: Number,
})

export const SoftenerTestData = new mongoose.Schema({
  totalhardness: Number,
  conductivity: Number,
  ph: Number,
})
export const BoilerWaterTestData = new mongoose.Schema({
  softener: SoftenerTestData,
  feedwater: FeedWaterData,
  boiler: BoilerData,
  condensate: CondensateData,
})
export const BoilerWaterTestSchema = new mongoose.Schema({
  date: String,
  time: String,
  testedby: String,
  data: BoilerWaterTestData,
})

const BoilerWaterTest = mongoose.model("boilerwatertest", BoilerWaterTestSchema)
export default BoilerWaterTest
