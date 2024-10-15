const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb) {
        console.log("OnConnect", session.id)
        // cb(new Error("Cannot Accept")) // reject
        cb() // accept the connection
    },
    onMailFrom(address, session, cb) {
        console.log("OnMailFrom", address.address, session.id)
    },
    onRcptTo(address, session, cb) {
        console.log("OnRcptTo", address.address, session.id)
        cb()
    },
    onData(stream, session, cb) {
        stream.on("data", (dataChunk) => console.log('onData', dataChunk.toString()))
        stream.on("end", cb)
    }
})

server.listen(25, () => console.log("Mail Server running on port 25"))