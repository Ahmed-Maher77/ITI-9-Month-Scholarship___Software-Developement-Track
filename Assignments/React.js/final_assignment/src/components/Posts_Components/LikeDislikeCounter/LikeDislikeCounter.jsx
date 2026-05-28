import { useTranslation } from "react-i18next";
import "./LikeDislikeCounter.css";

const LikeDislikeCounter = ({
    likes,
    dislikes,
    reaction,
    onLike,
    onDislike,
}) => {
    const { t } = useTranslation();
    return (
        <div className="like-dislike-counter">
            <button
                type="button"
                className={`reaction-btn ${reaction === "like" ? "active" : ""}`}
                aria-label={t("postCard.likeAria")}
                onClick={onLike}
            >
                <i className="fa-regular fa-thumbs-up"></i>
                <span>{likes}</span>
            </button>

            <button
                type="button"
                className={`reaction-btn ${reaction === "dislike" ? "active dislike" : ""}`}
                aria-label={t("postCard.dislikeAria")}
                onClick={onDislike}
            >
                <i className="fa-regular fa-thumbs-down"></i>
                <span>{dislikes}</span>
            </button>
        </div>
    );
};

export default LikeDislikeCounter;
