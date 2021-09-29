import {ServerInfo} from "apollo-server";
const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`

    type Book {
        title: String
        author: String
    }
    
    type Query {
        books: [Book]
    }
`;

const looks = [
    {
        title: 'The ag',
        author: 'Kate Chopingf',
    },
    {
        title: 'City of Gltyjashhhs',
        author: 'Paul Austtyjer',
    },
];

const resolvers = {
    Query: {
        books: () => looks,
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}: ServerInfo) => {
    console.log(`🚀  Server ready at ${url}`);
});
