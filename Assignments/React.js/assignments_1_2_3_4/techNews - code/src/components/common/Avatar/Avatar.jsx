import "./Avatar.css";

function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 60%)`;
}

const Avatar = ({ username = "", src = "", size = 40, alt = "avatar" }) => {
    const firstChar = username ? username[0].toUpperCase() : "";
    const bgColor = username ? stringToColor(username) : "#999";

    const style = {
        width: size,
        height: size,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        color: "#fff",
        fontWeight: 600,
        fontSize: Math.round(size * 0.5),
        userSelect: "none",
    };

    if (src) {
        return (
            <img
                className="app-avatar"
                src={src}
                alt={alt}
                style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    objectFit: "cover",
                }}
            />
        );
    }

    return (
        <div className="app-avatar" style={style} aria-hidden={!firstChar}>
            {firstChar}
        </div>
    );
};

export default Avatar;
