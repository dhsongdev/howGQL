import { ApolloServer, gql } from 'apollo-server';

//db
let tweets = [
  {
    id: '1',
    text: 'hello world first',
  },
  {
    id: '2',
    text: 'hello world second',
  },
];

//schema define
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

//resolvers
const resolvers = {
  Query: {
    tweet(root, { id }) {
      console.log(id);
      return tweets.find((element) => element.id === id);
    },
    allTweets() {
      return tweets;
    },
  },
  Mutation: {
    postTweet(root, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(root, { id }) {
      if (!tweets.find((element) => element.id === id)) {
        return false;
      }
      tweets = tweets.filter((item) => !(item.id === id));
      return true;
    },
  },
};

//server define
const server = new ApolloServer({ typeDefs, resolvers });

//open server
server.listen().then(({ url }) => {
  console.log(`running on ${url}`);
});
