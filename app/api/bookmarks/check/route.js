import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "@/config/database";
import User from "@/models/User";


export const dynamic = 'force-dynamic'
//method: POST
//path: /api/bookmarks

export const POST = async(req)=>{
    try {
        await connectDB()
        const data = await getSessionUser()
        if(!data){
            return new Response('Unauthorized', { status: 401 });
        }
        const {userId}=data
        const {propertyId}= await req.json()
        const user=await User.findById({_id:userId})
        let isBookmarked = user.bookmarks.includes(propertyId)
        return new Response(JSON.stringify({isBookmarked}), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('Internal Server Error', { status: 500 });
    }
}