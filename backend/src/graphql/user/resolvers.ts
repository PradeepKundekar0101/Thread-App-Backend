
import UserService, { createUserPayload } from "../../services/user"

const query ={
    getToken:async(_:any,payload:{email:string,password:string})=>{
        const {email,password} = payload;
        const token = UserService.getToken({email,password})
        return token;
    }
}
const mutations ={
    createUser:async(_:any,payload:createUserPayload)=>{
        const res = await UserService.createUser(payload);
        return res.id
    }
}
export const resolver = {query,mutations}