import { useTranslation } from "react-i18next";
import "./PostsLoading.css";

function PostsLoading() {
    const { t } = useTranslation();
    return (
        <section
            className="PostsLoading"
            aria-live="polite"
            aria-label={t("postsLoading.loadingAria")}
        >
            <div className="loading-featured skeleton-shimmer"></div>

            <div className="loading-posts-grid">
                {Array.from({ length: 3 }).map((_, index) => (
                    <article key={index} className="loading-post-card">
                        <div className="loading-image skeleton-shimmer"></div>
                        <div className="loading-content">
                            <div className="loading-line lg skeleton-shimmer"></div>
                            <div className="loading-line md skeleton-shimmer"></div>
                            <div className="loading-line sm skeleton-shimmer"></div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default PostsLoading;
