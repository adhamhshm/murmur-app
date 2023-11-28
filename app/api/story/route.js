import Story from "@models/story";
import { connectToDB } from "@utils/database";

// https://stackoverflow.com/questions/76356803/data-not-updating-when-deployed-nextjs13-app-on-vercel-despite-using-cache-no
export const dynamic = "force-dynamic";
{/* this is the get method, the post method is inside /api/story/new */}
export const GET = async (req) => {
    try {
        await connectToDB();
        const stories = await Story.find({}).sort({ _id: -1 }).populate("creator");

        return new Response(JSON.stringify(stories), { status: 200 });
    }
    catch (error) {
        return new Response("Failed to fetch stories", { status: 500 });
    }
}