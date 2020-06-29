import express from "express"
import { ApolloServer } from "apollo-server-express"
import cors from "cors"

import typeDefs from "../graphql/schemas/coolerWaterTest"
/*import resolvers from "../graphql/resolvers/houseware.js"*/
const port = process.env.PORT || 3333

const resolvers = {}

const apolloServer = new ApolloServer({
  typeDefs,
})

const app = express()

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
)

apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" })

app.all("*", (req, res) => {
  res.status(404).json({ status: "Missing endpoint" })
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Services listening on http://localhost:${port}`)
})
