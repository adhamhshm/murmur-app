import Story from "@models/story";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    {/* from the createStory function in the create-story page */}
    const { userId, story, tag, date } = await req.json();

    try {
        {/* remember to create data models for this --> story.js inside models */}
        await connectToDB();
        const newStory = new Story({ creator: userId, story, tag, date })
        await newStory.save();

        return new Response(JSON.stringify(newStory), { status: 201 });
    }
    catch {
        return new Response("Failed to create story", { status: 500 })
    }
}