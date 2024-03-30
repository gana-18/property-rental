import Property from "@/models/Property"
import connectDB from "@/config/database"
import {getSessionUser} from "@/utils/getSessionUser"
import cloudinary from "@/config/cloudinary"
//method: GET
//path: /api/properties
export const GET = async (request) => {
    try {
      await connectDB();
  
      const page = request.nextUrl.searchParams.get('page') || 1;
      const pageSize = request.nextUrl.searchParams.get('pageSize') || 6;
  
      const skip = (page - 1) * pageSize;
  
      const total = await Property.countDocuments({});
      const properties = await Property.find({}).skip(skip).limit(pageSize);
  
      const result = {
        total,
        properties,
      };
  
      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response('Something Went Wrong', { status: 500 });
    }
  };


//method: POST
//path: /api/properties
//add a new property
export const POST = async(req)=>{
    try {
        await connectDB()
        const session = await getSessionUser()
        if(!session){
            return new Response("Unauthorized",{status:401})
        }
        const userId = session.userId
        const formData = await req.formData()
        const amenities = formData.getAll("amenities")
        const images = formData.getAll("images").filter((image)=>image.name !== '');

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
        //upload images to cloudinary
        const imagePromises = []
        for(const image of images){
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint8Array(imageBuffer))
            const imageData = Buffer.from(imageArray)
            const imageBase64 = imageData.toString("base64")
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,{
                    folder:"propertyrental"
                }
            )
            imagePromises.push(result.secure_url)
            const uploadedImages = await Promise.all(imagePromises)
            propertyData.images = uploadedImages
        }
        const newProperty = new Property(propertyData)
        await newProperty.save()
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)
    } catch (error) {
        console.log(error)
        return new Response("Internal server error",{status:500})
    }
}