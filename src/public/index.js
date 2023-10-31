console.log("Init my chat");

const user = prompt("Insert name");
const socket = io();

document.querySelector("#chatInput").addEventListener("keyup", event => {
    if (event.key === "Enter" && event.currentTarget.trim().length > 0) {
        sendMessage(event.currentTarget.value)
    }
})

function sendMessage(message) {
    socket.emit("message", { user, message })
}