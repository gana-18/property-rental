import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "@/config/database";
import User from "@/models/User";


export const dynamic = 'force-dynamic'
 

//method :GET

export const GET = async(req)=>{
    try {
        await connectDB()
        const data = await getSessionUser()
        if(!data){
            return new Response('Unauthorized', { status: 401 });
        }
        const {userId}=data
        const user=await User.findOne({_id:userId})
        const bookmarks=user.bookmarks
        const properties=await Property.find({_id:{$in:bookmarks}})
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('Internal Server Error', { status: 500 });
    }
}


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
        let message;
        if(isBookmarked){
           user.bookmarks.pull(propertyId)
            message="Bookmark removed!"
            isBookmarked=false
        }else{
            user.bookmarks.push(propertyId)
            message="Property added to bookmarks"
            isBookmarked=true
        }
        await user.save()
        return new Response(JSON.stringify({message,isBookmarked}), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('Internal Server Error', { status: 500 });
    }
}