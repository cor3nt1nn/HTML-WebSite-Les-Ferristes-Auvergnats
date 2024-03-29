let chaticon = document.querySelector(".chaticon");
let chatbox = document.querySelector(".chat");
let sendicon = document.querySelector(".send-btn");

chaticon.addEventListener('click', (event) => {
    chatbox.classList.toggle("open");
    event.preventDefault();
});
document.addEventListener('click', (event) => {
    if (!chatbox.contains(event.target) && event.target !== chaticon) {
        chatbox.classList.remove("open");
    }
});


