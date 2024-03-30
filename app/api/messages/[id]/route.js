import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic='force-dynamic'

//method: PUT
//path: /api/messages/:id

export const PUT = async (req,{params}) => {
    try {
        await connectDB();
        const { id } = params;
        const data =await getSessionUser()
        if(!data){
            return new Response({message:'Unauthorized'}, { status: 401 });
        }
        const {userId}=data
        const message = await Message.findById(id);
        if (!message) {
            return new Response({message:'Message not found'}, { status: 404 });
        }
        if(message.recipient.toString()!==userId){
            return new Response({message:'Unauthorized'}, { status: 401 });
        }
        message.read=!message.read
        await message.save()
        return new Response(JSON.stringify(message), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response({message:'Server error'}, { status: 500 });
    }
}


//method:DELETE
export const DELETE = async (req,{params}) => {
    try {
        await connectDB();
        const { id } = params;
        const data =await getSessionUser()
        if(!data){
            return new Response({message:'Unauthorized'}, { status: 401 });
        }
        const {userId}=data
        const message = await Message.findById(id);
        if (!message) {
            return new Response({message:'Message not found'}, { status: 404 });
        }
        if(message.recipient.toString()!==userId){
            return new Response({message:'Unauthorized'}, { status: 401 });
        }
        await message.deleteOne();
        return new Response('Message deleted', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response({message:'Server error'}, { status: 500 });
    }
}