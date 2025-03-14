const global_status = {
    400: "Bad Request",
    401: "Unauthorized",
    404: "Not Found",
    403: "Forbidden",
    200: "OK",
    500: "Internal Server Error"
}

class response {
    constructor(code, res) {
        this.code = code
        this.status = global_status[code] || "Method not define yet"
        this.res = res || {"message": this.status}
    }

    send(res) {
        res.status(this.code).json({
            code: this.code,
            status: this.status,
            response: this.res,
            timestamp: new Date().toISOString() 
        });
    }
}

module.exports = response