import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        //refer 'notes' where to get the credentials
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    //in nextauth we will have callbacks
    callbacks: {
        /* get the session */
        async session({ session }) {
        const sessionUser = await User.findOne({
            //getting the current email from the session
            email: session.user.email
        })

        //update the session id to the current user
        session.user.id = sessionUser._id.toString();

        return session;
        },

        /* get the profile */
        async signIn({ profile }) {
            //next.js route is a serverless route --> a lambda function that opens up only when gets called upon
            //from here we can go to setup the database.js in the utils folder
            //setup the mongoDB first
            try {
                await connectToDB();
                //check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
                //if not create a new user and save to the database
                //we need to create a function to add a new user 
                //therefore go to user.js in models --> to design the document of the user that will be created
                if(!userExists) {
                await User.create({
                    email: profile.email,
                    //username: profile.name.replace(" ", "").toLowerCase(),
                    username: "Anonymous",
                    image: profile.picture
                    })
                }
                return true;
            }
            catch(error) {
                console.log("Authentication error: ", error.message);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST}
//can refer to the next.js documenation about the implementation