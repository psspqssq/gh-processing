import "dotenv/config"
import "#root/db/connection"

import Service from "./db/models/Shop/Service"

Service.insertMany({
  type: 1,
  date: "1-1-2020",
  subject: "Test service",
  body: "This is a test service, ignore it",
  machines: ["5f0bcbbc2617455c386a812c", "5f0bcbc52617455c386a812e"],
  areas: ["5f0b9e1817f5dd6fb0375168"],
})
