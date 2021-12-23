import { join } from "path";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const { PORT = "3000" } = process.env;

const messages: string[] = [];

const app = express();
app.use(express.static(join(__dirname, "public")));

const server = http.createServer(app);
const io = new Server(server);

app.get("/messages", (req, resp) => {
  resp.send(messages);
});

// events
io.on("connection", (socket) => {
  socket.on("message.send", (message) => {
    messages.push(message);

    console.log(`message: ${message}`);
    io.emit("message.send", message);
  });
});

server.listen(+PORT, () => console.log(`Listening on port: ${PORT}`));
