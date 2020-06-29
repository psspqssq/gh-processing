import CoolerWaterTest from "../../db/models/CoolerWaterTest"

const coolerWaterTestResolver = (context, args) => {
  return CoolerWaterTest.find({})
}

export default coolerWaterTestResolver
