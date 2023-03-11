import { ApolloServer, gql } from 'apollo-server';

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

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`running on ${url}`);
});
