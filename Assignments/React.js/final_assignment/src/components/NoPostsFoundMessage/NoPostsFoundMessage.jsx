import { memo } from "react";
import { useTranslation } from "react-i18next";
import "./NoPostsFoundMessage.css";

function NoPostsFoundMessage({
    title,
    subtitle,
    buttonLabel,
    onButtonClick,
    showCallToAction = true,
}) {
    const { t } = useTranslation();
    return (
        <section className="NoPostsFoundMessage text-center" aria-live="polite">
            <div className="empty-state-icon">
                <i className="fa-regular fa-newspaper"></i>
            </div>
            <h3 className="empty-state-title mb-2">
                {title ?? t("emptyState.noPostsTitle")}
            </h3>
            <p className="empty-state-subtitle mb-4">
                {subtitle ?? t("emptyState.noPostsSubtitle")}
            </p>
            {showCallToAction ? (
                <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={onButtonClick}
                >
                    {buttonLabel ?? t("emptyState.createFirstPost")}
                </button>
            ) : null}
        </section>
    );
}

export default memo(NoPostsFoundMessage);
