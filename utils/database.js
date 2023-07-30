import mongoose from "mongoose";

let isConnected = false; //to track the connection

export const connectToDB = async () => {
    mongoose.set("strictQuery", true); //mongoose option, if dont set, will get a warning

    if(isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_story",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log("MongoDB connected");
    }
    catch (error) {
        console.log("Database connection error: ", error.message);
    }
}