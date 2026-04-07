const generateCookie = (res, accessToken) => {
    res.cookie("ITI_ACCESS_TOKEN", accessToken, {
        httpOnly: true,
        sameSite: "Strict",
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    });
};


export default generateCookie;