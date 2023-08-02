//do note that we can use the same method to get the post here
//as the same we use inside /api/story/route.js
//we just modify this a bit

import Story from "@models/story";
import { connectToDB } from "@utils/database";

//we have params, that will get passed when we have dynamic variable inside the URL
//is this example, [id] is the dynamic parameter --> we can access params.id
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const stories = await Story.find({ creator: params.id }).sort({ _id: -1 }).populate("creator");

        return new Response(JSON.stringify(stories), { status: 200 });
    }
    catch (error) {
        return new Response("Failed to fetch user's stories", { status: 500 });
    }
}