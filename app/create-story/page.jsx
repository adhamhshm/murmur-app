"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import moment from "moment";

import Form from "@components/Form";

const CreateStory = () => {

    {/* use the useRouter */}
    const router = useRouter();

    {/* get the current session user */}
    const { data: session } = useSession();
    
    {/* create a whether a form is in submitting state or not */}
    const [submitting, setSubmitting] = useState(false);

    {/* create the story content state */}
    const [post, setPost] = useState({ story: "", tag: "", date: ""});

    const currentDate = moment(new Date()).format('D MMM YYYY, h:mm a');

    {/* create story function */}
    const createStory = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // create the api route for post method
            const response = await fetch("/api/story/new", {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.id,
                    story: post.story.replace(/\\n/g,'\n'),
                    tag: post.tag,
                    date: currentDate.toString()
                })
            })
            if(response.ok) {
                router.push("/");
            }
        }
        catch (error) {
            console.log("Create story error: ", error.message);
        }
        finally {
            setSubmitting(false);
        }
    }
    
    return (
        <Form 
            //we past the following props to the Form component --> pass by props
            type="Create" 
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createStory}
        />
    )
}

export default CreateStory;