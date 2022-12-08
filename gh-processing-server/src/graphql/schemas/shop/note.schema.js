import { gql } from "apollo-server";
import Note from "../../../db/models/Shop/Note";
export const typeDefs = gql`
  extend type Query {
    notes: [Note]
  }
  type Note {
    id: ID!
    requestdate: String
    completeddate: String
    open: Boolean
    subject: String
    note: String
    users: [ID]
  }

  input NoteInput {
    requestdate: String
    completeddate: String
    open: Boolean
    subject: String
    note: String
    users: [ID]
  }

  extend type Mutation {
    CreateNote(note: NoteInput): [Note]
  }
`;
export const resolvers = {
  Query: {
    notes: () => {
      return Note.find({});
    },
  },
  Mutation: {
    CreateNote: (root, args) => {
      return new Promise((resolve, reject) => {
        Note.insertMany({
          ...args.note,
        }).then((results) => {
          resolve(results);
        });
      });
    },
  },
};
