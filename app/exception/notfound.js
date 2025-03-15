class NotFound extends Error {
    constructor(message) {
        super(message)
        this.name = 'Notfound'
    }
}

module.exports = NotFound