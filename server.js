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
let users = [
  {
    id: '11',
    firstName: 'apol',
    lastName: 'lo',
  },
  {
    id: '12',
    firstName: 'gra',
    lastName: 'phql',
  },
];

//schema define
const typeDefs = gql`
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    allUsers: [User!]!
  }
  type Tweet {
    id: ID!
    text: String!
    user: User!
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
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
    allUsers() {
      return users;
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
  //fullName은 db에 없는것. resolver로 값 만들어 return
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
};

//server define
const server = new ApolloServer({ typeDefs, resolvers });

//open server
server.listen().then(({ url }) => {
  console.log(`running on ${url}`);
});
