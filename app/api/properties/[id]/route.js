import Property from "@/models/Property";
import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser";
//method: GET
//path: /api/properties/:id

export const GET = async(req,{params})=>{
    try {
        await connectDB()
        const {id}=params
        const property=await Property.findById(id)
        if(!property){
            return new Response("Property not found",{status:404})
        }
        return new Response(JSON.stringify(property),{status:200})
        
    } catch (error) {
        console.log(error)
        return new Response("Internal server error",{status:500})
    }
}

//method: DELETE
//path: /api/properties/:id

export const DELETE = async(req,{params})=>{
    try {
        await connectDB()
        const userData = await getSessionUser()
        if(!userData){
            return new Response("User required",{status:401})
        }
        const {userId}=userData
        const {id}=params
        const property=await Property.findById(id)
        if(!property){
            return new Response("Property not found",{status:404})
        }
        if(property.owner.toString() !== userId){
            return new Response("Unauthorized",{status:401})
        }
        await property.deleteOne()
        return new Response("Property deleted",{status:200})
    } catch (error) {
        console.log(error)
        return new Response("Internal server error",{status:500})
    }
}

//method: PUT
//path: /api/properties/:id
export const PUT = async(req,{params})=>{
    try {
        await connectDB()
        const session = await getSessionUser()
        if(!session){
            return new Response("Unauthorized",{status:401})
        }
        const userId = session.userId
        const {id} = params
        const oldProperty = await Property.findById(id)
        if(!oldProperty){
            return new Response("Property not found",{status:404})
        }
        if(oldProperty.owner.toString() !== userId){
            return new Response("Unauthorized",{status:401})
        }
        const formData = await req.formData()
        const amenities = formData.getAll("amenities")

        const propertyData={
            type:formData.get("type"),
            name:formData.get("name"),
            description:formData.get("description"),
            location:{
                street:formData.get("location.street"),
                city:formData.get("location.city"),
                state:formData.get("location.state"),
                zipcode:formData.get("location.zipcode"),
            },
            beds:formData.get("beds"),
            baths:formData.get("baths"),
            square_feet:formData.get("square_feet"),
            amenities,
            rates:{
                weekly:formData.get("rates.weekly"),
                monthly:formData.get("rates.monthly"),
                nightly:formData.get("rates.nightly"),
            },
            seller_info:{
                name:formData.get("seller_info.name"),
                email:formData.get("seller_info.email"),
                phone:formData.get("seller_info.phone"),
            },
            owner:userId,
        }
        const updatedProperty=await Property.findByIdAndUpdate(id,propertyData)
        return new Response(JSON.stringify(updatedProperty),{status:200})
    } catch (error) {
        console.log(error)
        return new Response("Internal server error",{status:500})
    }
}