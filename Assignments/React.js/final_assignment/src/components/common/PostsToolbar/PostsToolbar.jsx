import { useTranslation } from "react-i18next";
import "./PostsToolbar.css";

function PostsToolbar({
    searchQuery,
    onSearchChange,
    sortOrder,
    onSortChange,
}) {
    const { t } = useTranslation();
    return (
        <div className="posts-toolbar">
            <div className="posts-toolbar__search-sort">
                <label className="posts-search" htmlFor="posts-search-input">
                    <div className="posts-search__field">
                        <span
                            className="posts-search__icon-wrap"
                            aria-hidden="true"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                            id="posts-search-input"
                            type="search"
                            className="form-control app-form-control posts-search__input"
                            placeholder={t("postsToolbar.searchPlaceholder")}
                            value={searchQuery}
                            onChange={onSearchChange}
                            autoComplete="off"
                        />
                    </div>
                </label>

                <div
                    className="posts-sort"
                    aria-label={t("postsToolbar.sortAria")}
                >
                    <div
                        className="posts-sort__toggle"
                        role="group"
                        aria-label={t("postsToolbar.sortAria")}
                    >
                        <button
                            type="button"
                            className={`posts-sort__btn ${sortOrder === "newest" ? "active" : ""}`}
                            onClick={() => onSortChange("newest")}
                        >
                            {t("postsToolbar.newest")}
                        </button>
                        <button
                            type="button"
                            className={`posts-sort__btn ${sortOrder === "oldest" ? "active" : ""}`}
                            onClick={() => onSortChange("oldest")}
                        >
                            {t("postsToolbar.oldest")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostsToolbar;
