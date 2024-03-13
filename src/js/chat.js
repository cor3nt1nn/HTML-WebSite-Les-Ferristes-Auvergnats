let chaticon = document.querySelector(".chaticon");
let chatbox = document.querySelector(".chat");
let sendicon = document.querySelector(".send-btn");

chaticon.addEventListener('click', (event) => {
    chatbox.classList.toggle("open");
    event.preventDefault();
});

sendicon.addEventListener('click', () => {
    var messageTextArea = document.getElementById('message');
    console.log("Message Sent");
    messageTextArea.value = '';
});

document.addEventListener('click', (event) => {
    if (!chatbox.contains(event.target) && event.target !== chaticon) {
        chatbox.classList.remove("open");
    }
});
