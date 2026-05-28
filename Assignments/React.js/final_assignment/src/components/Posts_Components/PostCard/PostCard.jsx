import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./PostCard.css";
import TooltipText from "../../common/TooltipText/TooltipText";
import formatDate from "../../../utils/functions/formatDate";
import LikeDislikeCounter from "../LikeDislikeCounter/LikeDislikeCounter";
import { toast } from "react-toastify";

function PostCard({
    id,
    title,
    description,
    comments,
    author,
    date,
    image,
    category,
    likes: initialLikes = 0,
    dislikes: initialDislikes = 0,
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [reaction, setReaction] = useState(null);
    const fallbackImage = "https://placehold.net/800x600.png";

    const handleImageError = useCallback((event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = fallbackImage;
    }, []);

    const handleLike = useCallback(() => {
        if (reaction === "like") {
            setLikes((prev) => Math.max(0, prev - 1));
            setReaction(null);
            return;
        }

        if (reaction === "dislike") {
            setDislikes((prev) => Math.max(0, prev - 1));
        }

        setLikes((prev) => prev + 1);
        setReaction("like");
    }, [reaction]);

    const handleDislike = useCallback(() => {
        if (reaction === "dislike") {
            setDislikes((prev) => Math.max(0, prev - 1));
            setReaction(null);
            return;
        }

        if (reaction === "like") {
            setLikes((prev) => Math.max(0, prev - 1));
        }

        setDislikes((prev) => prev + 1);
        setReaction("dislike");
    }, [reaction]);

    const handleShare = useCallback(async () => {
        const shareUrl = `${window.location.origin}/posts/${id}`;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: title || t("postCard.shareTitleFallback"),
                    text: description || "",
                    url: shareUrl,
                });
                return;
            }
            await navigator.clipboard.writeText(shareUrl);
        } catch {
            toast.error(t("postCard.shareError"));
        }
    }, [description, id, t, title]);

    return (
        <article className="PostCard">
            <div className="post-actions">
                <button
                    type="button"
                    className="post-action-btn"
                    aria-label={t("postCard.favoriteAria")}
                >
                    <i className="fa-regular fa-bookmark"></i>
                </button>
                <button
                    type="button"
                    className="post-action-btn"
                    aria-label={t("postCard.shareAria")}
                    onClick={handleShare}
                >
                    <i className="fa-solid fa-share-nodes"></i>
                </button>
            </div>

            {image && (
                <figure className="post-image mb-0">
                    <img
                        src={image}
                        alt={title || t("postCard.postCoverAlt")}
                        loading="lazy"
                        onError={handleImageError}
                    />
                    {category && (
                        <span className="post-image-category">
                            <i className="fa-solid fa-tag"></i>
                            {category}
                        </span>
                    )}
                    <button
                        type="button"
                        className="post-action-btn post-link-btn"
                        aria-label={t("postCard.openPostAria")}
                        onClick={() => navigate(`/posts/${id}`)}
                    >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </button>
                </figure>
            )}

            <div className="post-content p-3 p-md-4">
                <header className="post-header">
                    <TooltipText text={title}>
                        <h3 className="post-title mb-2">{title}</h3>
                    </TooltipText>
                    <p className="post-description mb-0">{description}</p>
                </header>

                <footer className="post-footer mt-4">
                    <div className="post-meta d-flex align-items-center gap-3 flex-wrap">
                        <span className="meta-item gap-2">
                            <i className="fa-regular fa-user"></i>
                            <span className="meta-author-name">{author}</span>
                        </span>
                        <span className="meta-item gap-2">
                            <i className="fa-regular fa-calendar"></i>
                            {formatDate(date)}
                        </span>
                    </div>

                    <div className="post-stats d-flex align-items-center justify-content-between gap-3 mt-3">
                        <LikeDislikeCounter
                            likes={likes}
                            dislikes={dislikes}
                            reaction={reaction}
                            onLike={handleLike}
                            onDislike={handleDislike}
                        />
                        <span
                            className="post-comments-stat"
                            aria-label={t("postCard.commentsCountAria")}
                        >
                            <i className="fa-regular fa-comment"></i>
                            {comments}
                        </span>
                    </div>
                </footer>
            </div>
        </article>
    );
}

export default memo(PostCard);
