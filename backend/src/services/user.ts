import { prismaClient } from "../libs/db"
import {createHmac,randomBytes} from "node:crypto"
import JWT from 'jsonwebtoken'
import { User } from "../graphql/user"
export interface createUserPayload{
    firstName: string
    lastName?: string
    email:string
    password:string
    salt:string
}
class UserService{
     private static  JWT_SECRET = "secretkey"
    public static async createUser(payload:createUserPayload){
        const {firstName,lastName,email,password} = payload;
        const salt = randomBytes(32).toString("hex");
        const hasedPassword = createHmac("sha256",salt).update(password).digest("hex");
        return prismaClient.user.create({
            data:
            {
                firstName,
                lastName,
                email,
                salt,
                password:hasedPassword
            }
        })
    }
    public static async getToken(payload:{email:string, password:string}){
        const {email,password} = payload;
        const user = await prismaClient.user.findUnique({where:{email}})
        if(!user) throw new Error("Invalid, Email does not exist!");
        const hasedPassword = createHmac("sha256",user.salt).update(password).digest("hex");
        if(hasedPassword!==user.password) throw new Error("Invalid password");
        const token = JWT.sign({id:user.id,email:user.email},UserService.JWT_SECRET);
        return token;

    }
}
export default UserService;