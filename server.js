
const
    http = require("http"),
    express = require("express"),
    socketio = require("socket.io"),
    pokemon = require("./data/pokemon.json"),
    moves = require("./data/moves.json");

const SERVER_PORT = 3000;

let onlineClients = new Set();

function onNewWebsocketConnection(socket) {
    console.info(`Socket ${socket.id} has connected.`);
    onlineClients.add(socket.id);

    socket.on('room', function(room) {
        socket.join(room);
        console.info(`Socket ${socket.id} has joined ${room}.`);
    });

    socket.on("disconnect", () => {
        onlineClients.delete(socket.id);
        console.info(`Socket ${socket.id} has disconnected.`);
    });
}

function startServer() {
    // create a new express app
    const app = express();

    // create http server and wrap the express app
    const server = http.createServer(app);
    // bind socket.io to that server
    const io = socketio(server);

    // serve static files from a given folder
    app.use(express.static("public"));

    // will fire for every new websocket connection
    io.on("connection", onNewWebsocketConnection);

    // create pokemon path
    app.get("/pokemon/:id", (req, res) => {
        let payload;
        const arr = req.params.id.split(",");
        if (arr.length > 1) {
            payload = [];
            for (r of arr) {
                if (pokemon[r] === undefined) {
                    throw new Error(`Could not find Pokemon of id: ${r}`);
                }
                payload.push(pokemon[r])
            }
        } else {
            if (pokemon[req.params.id] === undefined) {
                throw new Error(`Could not find Pokemon of id: ${req.params.id}`);
            }
            payload = pokemon[req.params.id];
        }
        res.send(payload);
    });

    // create moves path
    app.get("/moves/:id", (req, res) => {
        let payload;
        const arr = req.params.id.split(",");
        if (arr.length > 1) {
            payload = [];
            for (r of arr) {
                if (moves[r] === undefined) {
                    throw new Error(`Could not find move of id: ${r}`);
                }
                payload.push(moves[r])
            }
        } else {
            if (moves[req.params.id] === undefined) {
                throw new Error(`Could not find move of id: ${req.params.id}`);
            }
            payload = moves[req.params.id];
        }
        res.send(payload);
    });

    // important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
    server.listen(SERVER_PORT, () => console.info(`Listening on port ${SERVER_PORT}.`));
}

startServer();
