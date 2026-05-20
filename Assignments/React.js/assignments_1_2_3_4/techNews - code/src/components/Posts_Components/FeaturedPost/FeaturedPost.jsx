import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedPost.css";
import formatDate from "../../../utils/functions/formatDate";

function FeaturedPost({ posts = [] }) {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderPosts = useMemo(() => posts.slice(0, 3), [posts]);
    const totalPosts = sliderPosts.length;
    const normalizedActiveIndex = totalPosts > 0 ? activeIndex % totalPosts : 0;

    useEffect(() => {
        if (totalPosts <= 1) return undefined;

        const autoSlideInterval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalPosts);
        }, 5000);

        return () => {
            clearInterval(autoSlideInterval);
        };
    }, [totalPosts]);

    const handleSetActiveIndex = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    if (!sliderPosts.length) return null;

    return (
        <section className="FeaturedPost mb-4">
            <article className="featured-slider">
                {sliderPosts.map((post, index) => (
                    <div
                        key={post.id}
                        className={`featured-slide ${index === normalizedActiveIndex ? "active" : ""}`}
                        aria-hidden={index !== normalizedActiveIndex}
                    >
                        <button
                            type="button"
                            className="featured-link-btn"
                            aria-label="Open featured post"
                            onClick={() => navigate(`/posts/${post.id}`)}
                        >
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </button>

                        <img
                            src={post.image}
                            alt={post.title || "Featured post"}
                            loading="eager"
                        />
                        <div className="featured-overlay"></div>

                        <div className="featured-content">
                            <p className="featured-label mb-3">
                                <i className="fa-solid fa-arrow-trend-up me-2"></i>
                                FEATURED TODAY
                            </p>

                            <h2 className="featured-title mb-2">{post.title}</h2>
                            <p className="featured-description mb-0">
                                {post.description}
                            </p>
                        </div>

                        <div className="featured-meta">
                            <span className="featured-author">
                                <i className="fa-regular fa-user me-2"></i>
                                {post.author}
                            </span>
                            <span>
                                {formatDate(post.date)} -{" "}
                                {Math.max(4, Math.ceil((post.views || 800) / 250))} mins
                                read
                            </span>
                        </div>
                    </div>
                ))}

                <div className="featured-pagination">
                    {sliderPosts.map((post, index) => (
                        <button
                            key={post.id}
                            type="button"
                            className={`featured-dot ${index === normalizedActiveIndex ? "active" : ""}`}
                            aria-label={`Show featured post ${index + 1}`}
                            onClick={() => handleSetActiveIndex(index)}
                        ></button>
                    ))}
                </div>
            </article>
        </section>
    );
}

export default memo(FeaturedPost);
