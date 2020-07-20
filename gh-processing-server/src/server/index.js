import express from "express"
import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import Area from "../db/models/Shop/Area"
import schema from "../graphql/schemas"
const bodyParser = require("body-parser")

const port = process.env.PORT || 3333
const graphql = process.env.GRAPHQL_ENDPOINT || "graphql"

var jsonParser = bodyParser.json()

const apolloServer = new ApolloServer({
  schema,
})

const app = express()

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
)

app.use(bodyParser.urlencoded({ extended: true }))

apolloServer.applyMiddleware({ app, cors: false, path: "/" + graphql })

// Area Endpoint
app.post("/v1/area", jsonParser, function (req, res) {
  console.log(req.body)
  Area.insertMany(
    {
      name: req.body.name,
      location: req.body.location,
    },
    function (err, result) {
      if (err) {
        console.log("Error trying to insert data in /area/ " + err)
        res.status(500).send(err)
      } else {
        res.status(200).send(result)
        console.log("Added new record in /area/ " + result)
      }
    }
  )
})
app.get("/v1/area", jsonParser, (req, res) => {
  Area.find({}, function (err, result) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(result)
    }
  })
    .populate("machines")
    .populate("areas")
})
app.all("*", function (req, res) {
  res.status(404).json({ status: "Missing endpoint" })
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Services listening on http://localhost:${port}/${graphql}`)
})
