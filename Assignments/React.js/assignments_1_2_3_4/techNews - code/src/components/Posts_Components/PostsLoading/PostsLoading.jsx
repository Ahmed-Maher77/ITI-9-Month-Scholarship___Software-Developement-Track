import "./PostsLoading.css";

const PostsLoading = () => (
    <section className="PostsLoading" aria-live="polite" aria-label="Loading posts">
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

export default PostsLoading;
