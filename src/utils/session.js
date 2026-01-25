const setAuthCookie = async (res, token) => {
    res.cookie('currentUser', token, {
        signed: true,
        httpOnly: true,
        maxAge: 3600000
    });
};
export { setAuthCookie };