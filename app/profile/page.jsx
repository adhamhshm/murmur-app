"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//this is the Profile component
import Profile from "@components/Profile";

const UserProfile = () => {

    {/* get the session of the user */}
    const { data: session } = useSession();

    const router = useRouter();

    {/* the posted posts in the database of the user */}
    const [postsDataByUser, setPostsDataByUser] = useState([]);

    //make a get request to read from the database of the user
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`, { next: { revalidate: 10 } });
        const data = await response.json();

        setPostsDataByUser(data);
    }
    
    useEffect(() => {
        //only fetch data when we have the session of the user
        if(session?.user.id) {
            fetchPosts();
        } 
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-story?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        
        //built in confirmation notification
        const isConfirmed = confirm("Delete this story?");

        if (isConfirmed) {
            try {
                await fetch(`/api/story/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = postsDataByUser.filter((item) => item._id !== post._id)

                setPostsDataByUser(filteredPosts);
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile 
            name="My"
            desc="View, edit or delete your stories here"
            data={postsDataByUser}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default UserProfile;