import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

//method:GET
//path:/api/messages
export const GET = async(req)=>{
    try {
        await connectDB();
        const data =await getSessionUser()
        if(!data){
            return new Response({message:'Unauthorized'}, { status: 401 });
        }
        const {userId}=data
        const readMessages = await Message.find({recipient:userId,read:true})
        .sort({createdAt: -1})
        .populate('sender', 'username')
        .populate('property', 'name');
        const unreadMessages = await Message.find({recipient:userId,read:false})
        .sort({createdAt: -1})
        .populate('sender', 'username')
        .populate('property', 'name');
        const messages = [...unreadMessages, ...readMessages]
        return new Response(JSON.stringify(messages), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 });
    }
}


//method:POST
//path: /api/messages

export const POST =async(req)=>{
    try {
        await connectDB();
        const {name,phone, email, message,property,recipient} =await req.json();
        const data =await getSessionUser()
        if(!data){
            return new Response({message:'Unauthorized'}, { status: 401 });
        }
        const {user}=data

        //cannt send message to self
        if(user.id===recipient){
            return new Response({message:'You can\'t send message to yourself'}, { status: 400 });
        }
        const newMessage=new Message({
            phone,
            email,
            body:message,
            property,
            name,
            recipient,
            sender:user.id
        })
        await newMessage.save();
        return new Response("Message sent", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 });
    }
}