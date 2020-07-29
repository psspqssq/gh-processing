import { gql } from "apollo-server"
import Media from "../../../db/models/Shop/Media"
export const typeDefs = gql`
  extend type Query {
    medias: [Media]
  }
  type Media {
    id: ID!
    address: String
    type: Int
    machines: [Machine]
    parts: [Part]
  }

  input MediaInput {
    address: String
    type: Int
    machines: [ID]
    parts: [ID]
  }

  extend type Mutation {
    CreateMedia(media: MediaInput): [Media]
  }
`
export const resolvers = {
  Query: {
    medias: () => {
      return Media.find({}).populate("machines parts")
    },
  },
  Mutation: {
    CreateMedia: (root, args) => {
      return new Promise((resolve, reject) => {
        Media.insertMany({
          ...args.media,
        }).then((results) => {
          resolve(results)
        })
      })
    },
  },
}
