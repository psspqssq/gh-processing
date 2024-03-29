import mongoose from "mongoose"
require("./models/Shop/Area")
require("./models/Shop/Machine")
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (error) {
    if (error) {
      console.log("Error starting up app, process closed: " + error)
      process.exit(1)
    }
  }
)
