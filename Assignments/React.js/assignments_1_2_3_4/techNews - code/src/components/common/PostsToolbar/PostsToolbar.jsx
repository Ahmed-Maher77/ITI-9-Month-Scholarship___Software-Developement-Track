import "./PostsToolbar.css";

function PostsToolbar({
    searchQuery,
    onSearchChange,
    sortOrder,
    onSortChange,
}) {
    return (
        <div className="posts-toolbar">
            <div className="posts-toolbar__search-sort">
                <label className="posts-search" htmlFor="posts-search-input">
                    <div className="posts-search__field">
                        <i className="fa-solid fa-magnifying-glass posts-search__icon"></i>
                        <input
                            id="posts-search-input"
                            type="search"
                            className="form-control app-form-control posts-search__input"
                            placeholder="Search by title or category"
                            value={searchQuery}
                            onChange={onSearchChange}
                        />
                    </div>
                </label>

                <div className="posts-sort" aria-label="Sort posts by date">
                    <div
                        className="posts-sort__toggle"
                        role="group"
                        aria-label="Sort posts by date"
                    >
                        <button
                            type="button"
                            className={`posts-sort__btn ${sortOrder === "newest" ? "active" : ""}`}
                            onClick={() => onSortChange("newest")}
                        >
                            Newest
                        </button>
                        <button
                            type="button"
                            className={`posts-sort__btn ${sortOrder === "oldest" ? "active" : ""}`}
                            onClick={() => onSortChange("oldest")}
                        >
                            Oldest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostsToolbar;
