"use client";

import { useState, useEffect } from "react";
import StoryCard from "./StoryCard";

//will only be used within the Feed component
const StoryCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-8 prompt_layout">
            {data.map((post) => (
                <StoryCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick} 
                />
            ))}
        </div>
    )
}

const Feed = () => {

    {/* the search text state */}
    const [searchText, setSearchText] = useState("");

    {/* the posted posts in the database */}
    const [postsData, setPostsData] = useState([]);

    const [searchTimeout, setSearchTimeout] = useState(null);

    const [searchedResults, setSearchedResults] = useState([]);

    //make a get request to read from the database
    const fetchPosts = async () => {
        const response = await fetch("/api/story", { cache: 'no-store',});
        const data = await response.json();

        setPostsData(data);
    }

    const filterStories = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return postsData.filter(
          (item) =>
            regex.test(item.tag) ||
            regex.test(item.story)
        );
    }

    {/* function to handle the search */}
    const handleSearch = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterStories(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    }

    const handleTagClick = (tagName) => {
        setSearchText(tagName);
    
        const searchResult = filterStories(tagName);
        setSearchedResults(searchResult);
    }

    useEffect(() => {
        //when load this function will be called to get the posts from the database
        fetchPosts();
    }, []);

    return (
        <section className="feed">
            {/* the search bar */}
            <form className="relative w-full flex-center">
                <input 
                    type="text" 
                    placeholder="Search story or a tag..."
                    value={searchText}
                    onChange={handleSearch}
                    required
                    className="search_input peer"
                />
            </form>

            {searchText ? (
                <StoryCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick} 
                />
                
            ) : (
                <StoryCardList
                    data={postsData}
                    handleTagClick={handleTagClick} 
                />
            )}
           
        </section>
    )
}

export default Feed