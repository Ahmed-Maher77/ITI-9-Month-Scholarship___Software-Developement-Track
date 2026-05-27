import { memo } from "react";
import PostCard from "../PostCard/PostCard";
import "./PostsContainer.css";

function PostsContainer({ posts }) {
    return (
        <div className="PostsContainer">
            {posts.map((post) => (
                <PostCard key={post.id} {...post} />
            ))}
        </div>
    );
}

export default memo(PostsContainer);