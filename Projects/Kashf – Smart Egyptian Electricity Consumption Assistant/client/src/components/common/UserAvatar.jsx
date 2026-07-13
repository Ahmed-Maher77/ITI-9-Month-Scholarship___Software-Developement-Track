import { useState } from "react";
import { getUserInitials } from "../../auth/userProfile";

const UserAvatar = ({ user, className = "size-9", size = "default" }) => {
    const initials = getUserInitials(user?.username || user?.name);
    const [failedPictureUrl, setFailedPictureUrl] = useState(null);
    const picture = user?.picture ?? null;
    const showPicture = picture && failedPictureUrl !== picture;

    if (showPicture) {
        return (
            <img
                key={picture}
                src={picture}
                alt={user?.username || user?.name || "User"}
                className={`${className} rounded-full object-cover`}
                onError={() => setFailedPictureUrl(picture)}
            />
        );
    }

    const sizeClasses = {
        default: "text-xs",
        full: "text-2xl md:text-3xl",
    };

    return (
        <span
            className={`${className} flex items-center justify-center rounded-full bg-kashf-muted ${sizeClasses[size] || sizeClasses.default} font-semibold text-kashf-light-blue`}
            aria-hidden="true"
        >
            {initials}
        </span>
    );
};

export default UserAvatar;
