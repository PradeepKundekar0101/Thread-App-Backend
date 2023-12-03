import {ApolloServer} from "@apollo/server"
import { User } from "./user";
async function createGraphqlServer()
{
    const server  = new ApolloServer({
        typeDefs:`
            type Query{
                ${User.queries}
            }
            type Mutation{
                ${User.mutations}
            }
        `,
        resolvers:{
            Query: {...User.resolver.query},
            Mutation:{...User.resolver.mutations}
        }
    })
    await server.start();
    return server;
}
export {createGraphqlServer}