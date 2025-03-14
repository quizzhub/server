const response = require('@view/response')

const myMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        const data = await res.json();

        req.user = data;
        next(); 
    } catch(e) {
        new response(400, "fail to verify token").send(res)
    }
};

module.exports = myMiddleware;
