import { ApolloServer, gql } from 'apollo-server';
import { tweets } from './db.js';

const typeDefs = gql`
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Tweet {
    id: ID!
    text: String!
    user: User!
  }
  type User {
    id: ID!
    username: String!
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    tweet(root, { id }) {
      console.log(id);
      return tweets.find((element) => element.id === id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`running on ${url}`);
});
