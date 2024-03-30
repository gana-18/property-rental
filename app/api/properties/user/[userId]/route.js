import Property from "@/models/Property"
import connectDB from "@/config/database"



//method: GET
//path: /api/properties/user/userId
export const GET = async(req,{params})=>{
    try {
        await connectDB()
        const userId = params.userId
        if(!userId){
            return new Response("User id is required",{status:400})
        }
        const properties = await Property.find({owner:userId})
        return new Response(JSON.stringify(properties),{status:200})
    } catch (error) {
        console.log(error)
        return new Response("Internal server error",{status:500})
    }
}