import express from "express";
import routerViews from "./routes/views.router.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import { Server } from "socket.io"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", routerViews);

const httpServer = app.listen(8080, () => console.log("Listening 8080"));
const io = new Server(httpServer);

const messages = []


io.on("connection", socket => {
    console.log("new socket :D");

    socket.on("message", data => {
        console.log(data);
        messages.push(data)
        io.emit("logs", messages)
    })
})