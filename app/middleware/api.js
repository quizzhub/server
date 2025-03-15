const response = require('@view/response')
const foo = require('@helper/check_if_user_exist')
const NotFound = require('@exception/notfound')

const myMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        const verify = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        const data = await verify.json();

        if(!verify.ok) {
            new response(401, data.error.message).send(res)
            return
        }

        foo(data.email).catch(err => {
            console.log("Error while processing user:", err);
        });

        req.user = data;
        next(); 
    } catch(e) {
        if(e instanceof NotFound) {
            new response(404, e.message).send(res)
        } else {
            console.log(e.message)
            new response(401, "fail to verify token").send(res)
        }
    }
};

module.exports = myMiddleware;
