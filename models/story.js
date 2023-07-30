import { Schema, model, models } from "mongoose";

const StorySchema = new Schema({
    //specify the creator of the specific story
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User", //one user can have many stories 
    },
    story: {
        type: String,
        required: [true, "Story content is required."],
    },
    tag: {
        type: String,
        required: [true, "Tag is required."],
    },
    date: {
        type: String,
    }
})

const Story = models.Story || model("Story", StorySchema);
export default Story;