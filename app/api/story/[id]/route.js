import Story from "@models/story";
import { connectToDB } from "@utils/database";

{/* GET request to read from database */}
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        {/* need to find a specific story by its ID */}
        const stories = await Story.findById(params.id).populate("creator");

        if (!stories) {
            return new Response("Story not found", { status: 404 });
        }

        return new Response(JSON.stringify(stories), { status: 200 });
    }
    catch (error) {
        return new Response("Failed to fetch stories", { status: 500 });
    }
};

{/* PATCH request to update to database */}
export const PATCH = async (req, { params }) => {
    const { story, tag, date } = await req.json();

    try {
        await connectToDB();
        {/* need to find a specific story by its ID */}
        const existingStory = await Story.findById(params.id);

        if (!existingStory) {
            return new Response("Story not found", { status: 404 });
        }

        {/* update story with new data */}
        existingStory.story = story;
        existingStory.tag = tag;
        existingStory.date = date;
        await existingStory.save();

        //return new Response(JSON.stringify(existingStory), { status: 200 });
        return new Response("Successfully updated the story", { status: 200 });
    }
    catch (error) {
        return new Response("Failed to update the story", { status: 500 });
    }
};

{/* DELETE request to delete data to the database */}
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        {/* find and delete the story */}
        await Story.findByIdAndRemove(params.id);

        return new Response("Story deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete story", { status: 500 });
    }
};