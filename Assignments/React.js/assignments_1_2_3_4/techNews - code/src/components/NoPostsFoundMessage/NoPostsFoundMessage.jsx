import { memo } from "react";
import "./NoPostsFoundMessage.css";

function NoPostsFoundMessage({
    title = "No posts yet",
    subtitle = "Your feed is empty right now. Create your first post to get things started.",
    buttonLabel = "Create your first post",
    onButtonClick,
}) {
    return (
        <section className="NoPostsFoundMessage text-center" aria-live="polite">
            <div className="empty-state-icon">
                <i className="fa-regular fa-newspaper"></i>
            </div>
            <h3 className="empty-state-title mb-2">{title}</h3>
            <p className="empty-state-subtitle mb-4">{subtitle}</p>
            <button
                type="button"
                className="btn btn-primary px-4"
                onClick={onButtonClick}
            >
                {buttonLabel}
            </button>
        </section>
    );
}

export default memo(NoPostsFoundMessage);