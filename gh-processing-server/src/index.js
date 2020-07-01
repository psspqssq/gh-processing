import "dotenv/config"
import "#root/db/connection"
import "#root/server"

import CoolerWaterTest from "./db/models/CoolerWaterTest"

CoolerWaterTest.insertMany({
  date: "1-1-1",
  time: "9:00",
  testedby: "Pablo",
  data: {
    plantrawwater: {
      totalhardness: 0,
      conductivity: 1010,
      ph: 7.0,
    },
    coolingtowers: [
      {
        area: "North",
        totalhardness: 600,
        conductivity: 2999,
        ph: 8.3,
        ptsa: 122,
        freechlorine: 0.4,
      },
      {
        area: "South",
        totalhardness: 700,
        conductivity: 3050,
        ph: 8.1,
        ptsa: 130,
        freechlorine: 0.4,
      },
    ],
    glycolloop: [
      {
        area: "Chill Loop",
        conductivity: 1220,
        ph: 8.9,
        glycolpercent: 23,
      },
      {
        area: "Blowmold",
        conductivity: 1320,
        ph: 8.2,
        glycolpercent: 35,
      },
    ],
  },
})
