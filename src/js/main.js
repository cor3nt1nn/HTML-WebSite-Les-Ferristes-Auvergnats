let menu=document.querySelector(".menuicon");
let navbar=document.querySelector(".navbar");

menu.onclick = () => {
    navbar.classList.toggle("open");
}