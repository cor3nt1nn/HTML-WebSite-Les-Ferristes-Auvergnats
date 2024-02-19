let menu=document.querySelector(".menuicon");
let navbar=document.querySelector(".navbar");

menu.onclick = () => {
    navbar.classList.toggle("open");
}

var windowHeight = window.innerHeight;
window.addEventListener('scroll', function() {
    var chaticon = document.querySelector('.chaticon');
    chaticon.classList.add('scrolled');
    var scrollTop = window.scrollY;
    var documentHeight = document.body.scrollHeight;
    if (scrollTop === 0 || (scrollTop + windowHeight) >= documentHeight) {
        chaticon.classList.remove('scrolled');
    }
});

