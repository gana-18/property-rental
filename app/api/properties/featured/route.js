import Property from "@/models/Property"
import connectDB from "@/config/database"

//method: GET
//path: /api/properties/featured
export const GET = async (request) => {
    try {
      await connectDB();
        const properties = await Property.find({is_featured: true});
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response('Something Went Wrong', { status: 500 });
    }
};