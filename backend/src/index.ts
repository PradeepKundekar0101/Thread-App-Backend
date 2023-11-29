import express from 'express';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from 'body-parser';

async function init()
{
    const app = express();
    const PORT = process.env.PORT || 8001;
    app.use(express.json())
    app.use(bodyParser.json());

    const server = new ApolloServer({
        typeDefs:`
            type Query{
                getGreet:String
                getGreetByName(name:String):String
            }
        `,
        resolvers:{
            Query:{
                getGreet:()=>("Hello, from graphql"),
                getGreetByName:(_,{name})=>(`Hello ${name} `)
            }
        }
    });
    await server.start();
    app.use("/graphql",expressMiddleware(server));
    app.listen(PORT,()=>{console.log("Server is running at PORT "+PORT)});
}
init();