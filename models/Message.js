import {Schema,model,models} from 'mongoose';

const MessageSchema=new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Sender is required']
    },
    recipient:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Receiver is required']
    },
    property:{
        type:Schema.Types.ObjectId,
        ref:'Property',
        required:[true,'Property is required']
    },
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    phone:{
        type:String,
    },
    body:{
        type:String,
    },
    read:{
        type:Boolean,
        default:false
    }
}, {timestamps:true});

const Message=models.Message || model('Message',MessageSchema);

export default Message;