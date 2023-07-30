import Link from "next/link"

//parameter can be seen inside the create-story page
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-wild">
                Share your stories to express your emotions, beliefs, and 
                troubles anonymously within the community.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
                <label>
                    {/* form space to write the story content */}
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your stories
                    </span>
                    <textarea 
                        value={post.story} 
                        onChange={(e) => setPost({ ...post, story: e.target.value})}
                        placeholder="Write your story here..."
                        required
                        className="form_textarea"
                    />
                    {/* form space to write the tag related */}
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag <span className="font-normal">( #chill #funny )</span>
                    </span>
                    <input 
                        value={post.tag} 
                        onChange={(e) => setPost({ ...post, tag: e.target.value})}
                        placeholder="#tag"
                        required
                        className="form_input"
                    />
                </label>

                {/* buttons */}
                <div className="flex-end mx-3 mb-5 gap-4">
                    {/* cancel button */}
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>
                    {/* submit button */}
                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="px-5 py-2 text-sm bg-black rounded-full text-white"
                    >
                        {/* to check if the user is creating or editing the post */}
                        {submitting ? `${type}` : type}
                    </button>
                </div>
                    
            </form>
        </section>
    )
}

export default Form