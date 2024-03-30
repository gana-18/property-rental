import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser= async(req)=>{
    try {
        const session =await getServerSession(authOptions)
        if(!session){
            return null
        }
        return {
            user:session.user,
            userId:session.user.id
        }
    } catch (error) {
        console.log(error)
        return null
    }
}