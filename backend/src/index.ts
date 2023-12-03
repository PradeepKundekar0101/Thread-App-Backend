import express from 'express';
import {createGraphqlServer} from "./graphql/index"
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from 'body-parser';
//@ts-ignore


async function init()
{
    const app = express();
    const PORT = process.env.PORT || 8001;
    app.use(express.json())
    app.use(bodyParser.json());

    app.use("/graphql",expressMiddleware(await createGraphqlServer()));
    app.listen(PORT,()=>{console.log("Server is running at PORT "+PORT)});
}
init();