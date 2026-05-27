import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../components/common/Avatar/Avatar";
import NoPostsFoundMessage from "../../components/NoPostsFoundMessage/NoPostsFoundMessage";
import formatDate from "../../utils/functions/formatDate";
import { getStoredAuth } from "../../utils/authStorage";
import "./PostDetails.css";
import { toast } from "react-toastify";
import TooltipText from "../../components/common/TooltipText/TooltipText";

function PostDetails() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reaction, setReaction] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([
        {
            id: "dummy-comment-1",
            name: "Sarah Johnson",
            userPic: "",
            text: "Great breakdown. The examples made this post easy to follow.",
            upvotes: 6,
            downvotes: 1,
            reaction: null,
        },
        {
            id: "dummy-comment-2",
            name: "Omar Khaled",
            userPic: "",
            text: "I like how this explains the idea in a practical way. Thanks for sharing.",
            upvotes: 3,
            downvotes: 0,
            reaction: null,
        },
        {
            id: "dummy-comment-3",
            name: "Mariam Adel",
            userPic: "",
            text: "Helpful read. Would love a quick follow-up post with advanced tips.",
            upvotes: 4,
            downvotes: 0,
            reaction: null,
        },
    ]);

    const auth = getStoredAuth();
    const commenterName = auth?.name || "Guest User";
    const commenterPic = auth?.userPic || "";
    const commentsSectionRef = useRef(null);

    useEffect(() => {
        const fetchPostById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/posts/${postId}`,
                );
                const fetchedPost = response.data;
                setPost(fetchedPost);
                setLikes(fetchedPost?.likes || 0);
                setDislikes(fetchedPost?.dislikes || 0);
            } catch {
                setPost(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostById();
    }, [postId]);

    const readMins = useMemo(() => {
        if (!post) return 1;
        const text =
            `${post.title || ""} ${post.description || ""} ${post.content || ""}`.trim();
        const words = text ? text.split(/\s+/).length : 0;
        return Math.max(1, Math.ceil(words / 220));
    }, [post]);

    const postUrl = useMemo(
        () => `${window.location.origin}/posts/${postId}`,
        [postId],
    );

    const persistReactions = useCallback(
        async (nextLikes, nextDislikes) => {
            setPost((prevPost) =>
                prevPost
                    ? {
                          ...prevPost,
                          likes: nextLikes,
                          dislikes: nextDislikes,
                      }
                    : prevPost,
            );
            try {
                await axios.patch(`http://localhost:3000/posts/${postId}`, {
                    likes: nextLikes,
                    dislikes: nextDislikes,
                });
            } catch {
                toast.error("Unable to save reactions. Please try again.");
            }
        },
        [postId],
    );

    const handleLike = useCallback(() => {
        if (reaction === "like") {
            const nextLikes = Math.max(0, likes - 1);
            setReaction(null);
            setLikes(nextLikes);
            persistReactions(nextLikes, dislikes);
            return;
        }

        let nextDislikes = dislikes;
        if (reaction === "dislike") {
            nextDislikes = Math.max(0, dislikes - 1);
            setDislikes(nextDislikes);
        }

        const nextLikes = likes + 1;
        setReaction("like");
        setLikes(nextLikes);
        persistReactions(nextLikes, nextDislikes);
    }, [dislikes, likes, persistReactions, reaction]);

    const handleDislike = useCallback(() => {
        if (reaction === "dislike") {
            const nextDislikes = Math.max(0, dislikes - 1);
            setReaction(null);
            setDislikes(nextDislikes);
            persistReactions(likes, nextDislikes);
            return;
        }

        let nextLikes = likes;
        if (reaction === "like") {
            nextLikes = Math.max(0, likes - 1);
            setLikes(nextLikes);
        }

        const nextDislikes = dislikes + 1;
        setReaction("dislike");
        setDislikes(nextDislikes);
        persistReactions(nextLikes, nextDislikes);
    }, [dislikes, likes, persistReactions, reaction]);

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: post?.title || "TechNews Post",
                    text: post?.description || "",
                    url: postUrl,
                });
                return;
            }
            await navigator.clipboard.writeText(postUrl);
        } catch {
            // no-op fallback for unsupported clipboard
        }
    };

    const scrollToComments = useCallback(() => {
        commentsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const handleAddComment = useCallback(
        (event) => {
            event.preventDefault();
            const nextComment = commentText.trim();
            if (!nextComment) return;

            setComments((prev) => [
                {
                    id: crypto.randomUUID(),
                    name: commenterName,
                    userPic: commenterPic,
                    text: nextComment,
                    upvotes: 0,
                    downvotes: 0,
                    reaction: null,
                },
                ...prev,
            ]);
            setCommentText("");
        },
        [commentText, commenterName, commenterPic],
    );

    const handleCommentVote = useCallback((commentId, voteType) => {
        setComments((prevComments) =>
            prevComments.map((comment) => {
                if (comment.id !== commentId) return comment;

                let nextUpvotes = comment.upvotes;
                let nextDownvotes = comment.downvotes;
                let nextReaction;

                if (voteType === "upvote") {
                    if (comment.reaction === "upvote") {
                        nextUpvotes = Math.max(0, comment.upvotes - 1);
                        nextReaction = null;
                    } else {
                        if (comment.reaction === "downvote") {
                            nextDownvotes = Math.max(0, comment.downvotes - 1);
                        }
                        nextUpvotes = comment.upvotes + 1;
                        nextReaction = "upvote";
                    }
                } else {
                    if (comment.reaction === "downvote") {
                        nextDownvotes = Math.max(0, comment.downvotes - 1);
                        nextReaction = null;
                    } else {
                        if (comment.reaction === "upvote") {
                            nextUpvotes = Math.max(0, comment.upvotes - 1);
                        }
                        nextDownvotes = comment.downvotes + 1;
                        nextReaction = "downvote";
                    }
                }

                return {
                    ...comment,
                    upvotes: nextUpvotes,
                    downvotes: nextDownvotes,
                    reaction: nextReaction ?? comment.reaction,
                };
            }),
        );
    }, []);

    if (isLoading)
        return <section className="PostDetails">Loading post...</section>;
    if (!post) {
        return (
            <section className="PostDetails">
                <NoPostsFoundMessage
                    title="Post not found"
                    subtitle="This post may have been removed or the link is invalid."
                />
            </section>
        );
    }

    return (
        <section className="PostDetails">
            <article className="post-details-card">
                {post.image ? (
                    <div className="post-details-banner">
                        <img
                            className="post-details-image"
                            src={post.image}
                            alt={post.title || "Post cover"}
                        />
                        <div className="post-details-banner-overlay"></div>
                        <div className="post-details-banner-copy">
                            <h1 className="post-details-title">{post.title}</h1>
                            <p className="post-details-description mb-0">
                                {post.description}
                            </p>
                        </div>
                        <div className="post-details-banner-actions">
                            <TooltipText
                                text="Add to favorites"
                                className="post-details-banner-tooltip"
                            >
                                <button
                                    type="button"
                                    className={`post-details-action-btn post-details-banner-btn ${isFavorite ? "active" : ""}`}
                                    onClick={() =>
                                        setIsFavorite((prev) => !prev)
                                    }
                                    aria-label="Toggle favorite"
                                >
                                    <i
                                        className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-bookmark`}
                                    ></i>
                                </button>
                            </TooltipText>
                            <TooltipText
                                text="Share this post"
                                className="post-details-banner-tooltip"
                            >
                                <button
                                    type="button"
                                    className="post-details-action-btn post-details-banner-btn"
                                    onClick={handleShare}
                                    aria-label="Share post"
                                >
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                </button>
                            </TooltipText>
                            <TooltipText
                                text="Jump to discussion"
                                className="post-details-banner-tooltip"
                            >
                                <button
                                    type="button"
                                    className="post-details-action-btn post-details-banner-btn comments-btn"
                                    onClick={scrollToComments}
                                    aria-label="Go to comments"
                                >
                                    <i className="fa-regular fa-comments"></i>
                                </button>
                            </TooltipText>
                        </div>
                    </div>
                ) : null}

                <div className="post-details-content">
                    <header className="post-details-header">
                        <div className="details-container">
                            <div className="post-details-author">
                                <Avatar username={post.author} size={42} />
                                <span>{post.author}</span>
                            </div>
                            <div className="post-details-meta">
                                <span>
                                    <i className="fa-regular fa-calendar me-2"></i>
                                    {formatDate(post.date)}
                                </span>
                                <span className="text-capitalize">
                                    <i className="fa-solid fa-tag me-2"></i>
                                    {post.category}
                                </span>
                                <span>
                                    <i className="fa-regular fa-clock me-2"></i>
                                    {readMins} mins read
                                </span>
                            </div>
                        </div>
                    </header>

                    <div className="post-details-actions">
                        <button
                            type="button"
                            className={`post-details-action-btn ${reaction === "like" ? "active" : ""}`}
                            onClick={handleLike}
                        >
                            <i className="fa-regular fa-thumbs-up"></i> {likes}
                        </button>
                        <button
                            type="button"
                            className={`post-details-action-btn ${reaction === "dislike" ? "active dislike" : ""}`}
                            onClick={handleDislike}
                        >
                            <i className="fa-regular fa-thumbs-down"></i>{" "}
                            {dislikes}
                        </button>
                    </div>

                    <p className="post-details-body">{post.content}</p>

                    <div
                        className="post-details-comments"
                        ref={commentsSectionRef}
                    >
                        <div className="post-details-discussion-head mb-3">
                            <h2 className="post-details-discussion-title">
                                Discussion Center
                            </h2>
                            <p className="post-details-discussion-subtitle mb-0">
                                Share your thoughts, ask questions, and react to this post.
                            </p>
                            <span className="post-details-discussion-dots" aria-hidden>
                                ...
                            </span>
                        </div>
                        <form
                            onSubmit={handleAddComment}
                            className="post-details-comment-form"
                        >
                            <div className="post-details-comment-author">
                                <Avatar
                                    username={commenterName}
                                    src={commenterPic}
                                    size={34}
                                />
                                <strong>{commenterName}</strong>
                            </div>
                            <textarea
                                value={commentText}
                                onChange={(event) =>
                                    setCommentText(event.target.value)
                                }
                                className="form-control"
                                rows={3}
                                placeholder="Write your comment..."
                            />
                            <button type="submit" className="btn btn-dark">
                                Add comment
                            </button>
                        </form>

                        <div className="post-details-comment-list">
                            {comments.length ? (
                                comments.map((comment) => (
                                    <article
                                        key={comment.id}
                                        className="post-details-comment-item"
                                    >
                                        <Avatar
                                            username={comment.name}
                                            src={comment.userPic}
                                            size={34}
                                        />
                                        <div>
                                            <strong>{comment.name}</strong>
                                            <p className="mb-0">
                                                {comment.text}
                                            </p>
                                            <div className="comment-votes mt-3">
                                                <button
                                                    type="button"
                                                    className={`comment-vote-btn ${comment.reaction === "upvote" ? "active" : ""}`}
                                                    onClick={() =>
                                                        handleCommentVote(
                                                            comment.id,
                                                            "upvote",
                                                        )
                                                    }
                                                >
                                                    <i className="fa-regular fa-thumbs-up"></i>
                                                    <span>
                                                        {comment.upvotes}
                                                    </span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`comment-vote-btn ${comment.reaction === "downvote" ? "active dislike" : ""}`}
                                                    onClick={() =>
                                                        handleCommentVote(
                                                            comment.id,
                                                            "downvote",
                                                        )
                                                    }
                                                >
                                                    <i className="fa-regular fa-thumbs-down"></i>
                                                    <span>
                                                        {comment.downvotes}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="post-details-empty-comments">
                                    <i className="fa-regular fa-comments"></i>
                                    <p className="mb-0">
                                        No comments yet. Start the discussion.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}

export default PostDetails;
