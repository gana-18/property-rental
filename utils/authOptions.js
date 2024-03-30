import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/User'
import connectDB from '@/config/database'
export const authOptions ={
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            },
        }),
    ],
    callbacks :{
        //invoked when the user is authenticated
        async signIn({profile}) {
            await connectDB()
            const UserExists = await User.findOne({email: profile.email})
            if(!UserExists){
                await User.create({
                    email:profile.email,
                    username:profile.name,
                    image:profile.picture
                })
            }
            return true;
            
        },

        //modifies session object
        async session({session}) {
            const user=await User.findOne({email:session.user.email})
            session.user.id=user._id.toString()
            return session;
        }
    }
}