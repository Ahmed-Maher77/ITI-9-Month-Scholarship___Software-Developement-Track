import { getStoredAuth } from "../../utils/authStorage";
import Avatar from "../../components/common/Avatar/Avatar";

function Profile() {
    const auth = getStoredAuth();
    const displayName = auth?.name || "User";
    const displayEmail = auth?.email || "-";
    const displayRole = auth?.role || "user";
    const displayPic = auth?.userPic || "";

    return (
        <section className="ProfilePage">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
                    {displayPic ? (
                        <Avatar src={displayPic} size={72} alt={`${displayName}'s picture`} />
                    ) : (
                        <Avatar username={displayName} size={72} />
                    )}
                    <div>
                        <h1 className="h3 mb-1">{displayName}</h1>
                        <p className="mb-0 text-secondary">{displayEmail}</p>
                        <span className="badge text-bg-dark mt-2 text-capitalize">{displayRole}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
