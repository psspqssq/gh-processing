import mongoose from "mongoose"

export const GlycolLoop = new mongoose.Schema({
  area: String,
  conductivity: Number,
  ph: Number,
  glycolpercent: Number,
})
export const CoolingTowerData = new mongoose.Schema({
  area: String,
  totalhardness: Number,
  conductivity: Number,
  ph: Number,
  ptsa: Number,
  freechlorine: Number,
})
export const PlantRawWaterData = new mongoose.Schema({
  totalhardness: Number,
  conductivity: Number,
  ph: Number,
})
export const CoolerWaterTestData = new mongoose.Schema({
  plantrawwater: PlantRawWaterData,
  coolingtowers: [CoolingTowerData],
  glycolloop: [GlycolLoop],
})

export const coolerWaterTestSchema = new mongoose.Schema({
  date: String,
  time: String,
  testedby: String,
  data: CoolerWaterTestData,
})

const CoolerWaterTest = mongoose.model("CoolerWaterTest", coolerWaterTestSchema)
export default CoolerWaterTest
