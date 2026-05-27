import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import NoPostsFoundMessage from "../../components/NoPostsFoundMessage/NoPostsFoundMessage";
import FeaturedPost from "../../components/Posts_Components/FeaturedPost/FeaturedPost";
import PostsLoading from "../../components/Posts_Components/PostsLoading/PostsLoading";
import PostsContainer from "../../components/Posts_Components/PostsContainer/PostsContainer";
import PostsToolbar from "../../components/common/PostsToolbar/PostsToolbar";
import useDebounce from "../../hooks/useDebounce";
import "./Posts.css";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const getRandomPosts = useCallback((nextPosts, count) => {
        const shuffled = [...nextPosts];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[randomIndex]] = [
                shuffled[randomIndex],
                shuffled[i],
            ];
        }
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }, []);

    const fetchPosts = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:3000/posts");
            const data = res.data;
            if (data.length > 0) {
                const featuredPosts = getRandomPosts(data, 3);
                setPosts(data);
                setFeaturedPosts(featuredPosts);
                setIsLoading(false);
                return;
            }

            setPosts([]);
            setFeaturedPosts([]);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, [getRandomPosts]);

    const handlePostCreated = useCallback((event) => {
        const created = event?.detail;
        if (!created) return;

        setPosts((prevPosts) => {
            const existsInPosts = prevPosts.some((p) => p.id === created.id);
            if (existsInPosts) return prevPosts;
            return [created, ...prevPosts];
        });
    }, []);

    useEffect(() => {
        (async () => {
            await fetchPosts();
        })();
    }, [fetchPosts]);

    useEffect(() => {
        window.addEventListener("postCreated", handlePostCreated);
        return () => {
            window.removeEventListener("postCreated", handlePostCreated);
        };
    }, [handlePostCreated]);

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const handleSortChange = useCallback((nextSortOrder) => {
        setSortOrder(nextSortOrder);
    }, []);

    const filteredPosts = useMemo(() => {
        const normalizedQuery = debouncedSearchQuery.trim().toLowerCase();

        if (!normalizedQuery) return posts;

        return posts.filter((post) => {
            const title = (post.title || "").toLowerCase();
            const category = (post.category || "").toLowerCase();

            return (
                title.includes(normalizedQuery) ||
                category.includes(normalizedQuery)
            );
        });
    }, [debouncedSearchQuery, posts]);

    const sortedPosts = useMemo(() => {
        return [...filteredPosts].sort((firstPost, secondPost) => {
            const firstDate = new Date(firstPost.date || 0).getTime();
            const secondDate = new Date(secondPost.date || 0).getTime();

            return sortOrder === "oldest"
                ? firstDate - secondDate
                : secondDate - firstDate;
        });
    }, [filteredPosts, sortOrder]);

    const hasNoMatchingPosts =
        !isLoading && featuredPosts.length > 0 && sortedPosts.length === 0;

    const handleClearSearch = useCallback(() => {
        setSearchQuery("");
    }, []);

    return (
        <div className="Posts">
            {isLoading ? (
                <PostsLoading />
            ) : featuredPosts.length > 0 ? (
                <>
                    <FeaturedPost posts={featuredPosts} />

                    <PostsToolbar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        sortOrder={sortOrder}
                        onSortChange={handleSortChange}
                    />

                    {sortedPosts.length > 0 ? (
                        <PostsContainer posts={sortedPosts} />
                    ) : (
                        hasNoMatchingPosts && (
                            <NoPostsFoundMessage
                                title="No matching posts"
                                subtitle="Try a different title or category to find posts in the feed."
                                buttonLabel="Clear the search"
                                onButtonClick={handleClearSearch}
                            />
                        )
                    )}
                </>
            ) : (
                <NoPostsFoundMessage />
            )}
        </div>
    );
}

export default Posts;
