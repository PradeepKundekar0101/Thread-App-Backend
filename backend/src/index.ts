import express from 'express';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from 'body-parser';
//@ts-ignore
import { prismaClient } from '../libs/db';

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
            type Mutation{
                createUser( firstName:String!,lastName:String!,email:String!,password:String!,salt:String! ):Boolean
            }
        `,
        resolvers:{
            Query:{
                getGreet:()=>("Hello, from graphql"),
                getGreetByName:(_,{name})=>(`Hello ${name} `)
            },
            Mutation:{
                createUser:async (_,{firstName,lastName,email,password,salt}
                    :
                {
                    firstName:string;
                    lastName:string;
                    email:string;
                    password:string;
                    salt:string}
                )=>{ prismaClient.user.create({
                    data:
                    {
                        email,
                        firstName,
                        lastName,
                        password,
                        salt:'random'
                    }}) }
            }
        }
    });
    await server.start();
    app.use("/graphql",expressMiddleware(server));
    app.listen(PORT,()=>{console.log("Server is running at PORT "+PORT)});
}
init();