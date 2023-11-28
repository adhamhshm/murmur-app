"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const StoryCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

    {/* get the current session of the user */}
    const { data: session } = useSession();

    {/* get the current path */}
    const pathName = usePathname();

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-2">
                {/* div to contain profile image, username and email */}
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" >
                    {session?.user.id === post.creator._id && pathName === "/profile" ? (
                        <Image
                            src={post.creator.image} 
                            alt="user image"
                            width={40}
                            height={40}
                            className="rounded-full object-contain"
                        /> 
                    ) : (
                        <Image
                            src="/assets/icons/user.svg" 
                            alt="user image"
                            width={40}
                            height={40}
                            className="rounded-full object-contain"
                        />
                    )} 
                    <div className="flex-1 flex-col">
                        {session?.user.id === post.creator._id && pathName === "/profile" ? (
                            <h3 className="font-satoshi font-semibold text-gray-900 text_dark">
                                You
                            </h3>
                        ): (
                            <h3 className="font-satoshi font-semibold text-gray-900 text_dark">
                                {post.creator.username}
                            </h3>
                        )}
                        <p className="font-inter text-sm text-gray-500 text_dark">
                            {post.date}
                        </p>
                    </div>
                </div>
                {session?.user.id === post.creator._id && pathName === "/profile" && (
                    <div className="delete_btn" onClick={handleDelete}>
                        <Image
                            src="/assets/icons/delete.svg"
                            width={24}
                            height={24}
                            alt="delete"
                        />
                    </div>
                )}
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700 whitespace-pre-line text_dark">
                {post.story}
            </p>
            <p 
                className="font-inter text-sm blue_gradient cursor-pointer text_tag_dark" 
                //if the tag is present, we can click the tag to show stories with similar tag
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                {post.tag}
            </p>

            {/* if there is a session, and it is the same as the creator of the user, and user is in the profile page
                we then show the following div with edit and delete button */}
            {session?.user.id === post.creator._id && pathName === "/profile" && (
                <div className='mt-5 flex-center border-t border-gray-100 pt-3'>
                    {/* the edit button */}
                    <button
                        className="font-inter font-extrabold text-sm green_gradient cursor-pointer"
                        onClick={handleEdit}
                    >
                         Edit
                    </button>
                </div>
            )}
        </div>
    )
}

export default StoryCard