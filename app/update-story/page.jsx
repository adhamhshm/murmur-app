"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";

import Form from "@components/Form";

const EditStory = () => {

    {/* use the useRouter */}
    const router = useRouter();

    {/* to search for a parameter */}
    const searchParams = useSearchParams();
    const storyId = searchParams.get("id");
    
    {/* create a whether a form is in submitting state or not */}
    const [submitting, setSubmitting] = useState(false);

    {/* create the story content state */}
    const [post, setPost] = useState({ story: "", tag: "", date: ""});

    useEffect(() => {
        const getStoryDetails = async () => {
            const response = await fetch(`/api/story/${storyId}`)
            const data = await response.json();
            setPost({
                story: data.story,
                tag: data.tag,
                date: data.date
            })
        }
        //if the storyId exists, then the function is called
        if(storyId) {
            getStoryDetails();
        }
    },[storyId]) //will take effect when the storyId changes

    {/* edit and update story function, notice that it just the same as createStory function in the create-story page */}
    const updateStory = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const currentDate = moment(new Date()).format('D MMM YYYY, h:mm a');

        if (!storyId) return alert("Missing storyId!");

        try {
            // create the api route for post method
            const response = await fetch(`/api/story/${storyId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    story: post.story,
                    tag: post.tag,
                    date: "Edited: " + currentDate.toString()
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
            type="Edit" 
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updateStory}
        />
    )
}

export default EditStory;