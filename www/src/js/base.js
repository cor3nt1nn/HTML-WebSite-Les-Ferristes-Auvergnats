let menu=document.querySelector(".menuicon");
let navbar=document.querySelector(".navbar");
let loginicon = document.querySelector(".login-click");
let loginbox = document.querySelector(".loginbox");

let loginlink= document.querySelector(".login-link");
let signinlink= document.querySelector(".signin-link");
let signinbox = document.querySelector(".signinbox");

menu.onclick = () => {
    navbar.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', function() {
    const submenus = document.querySelectorAll('.submenu');

    submenus.forEach(function(submenu) {
        const developp = submenu.querySelector('.developp');
        const subMenuList = submenu.querySelector('.sub-menu');

        developp.onclick = function(event) {
            event.preventDefault();
            subMenuList.classList.toggle("open");
        };

        document.addEventListener('click', function(event) {
            const isClickInside = submenu.contains(event.target);
            if (!isClickInside) {
                subMenuList.classList.remove("open");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const submenus = document.querySelectorAll('.submenuf');

    submenus.forEach(function(submenuf) {
        const developp = submenuf.querySelector('.developpf');
        const subMenuList = submenuf.querySelector('.sub-menu-f');

        developp.onclick = function(event) {
            event.preventDefault();
            subMenuList.classList.toggle("open");
        };

        document.addEventListener('click', function(event) {
            const isClickInside = submenuf.contains(event.target);
            if (!isClickInside) {
                subMenuList.classList.remove("open");
            }
        });
    });
});


document.addEventListener('click', function(event) {
    const isClickInsideMenu = menu.contains(event.target) || navbar.contains(event.target);
    if (!isClickInsideMenu){navbar.classList.remove("open");}
});

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


loginicon.addEventListener('click', (event) => {
    loginbox.classList.toggle("open");
    event.preventDefault();
});

signinlink.addEventListener('click', (event) => {
    loginbox.classList.toggle("open");
    signinbox.classList.toggle("open");
    event.preventDefault();
});

loginlink.addEventListener('click', (event) => {
    signinbox.classList.toggle("open");
    loginbox.classList.toggle("open");
    event.preventDefault();
});

document.addEventListener('click', (event) => {
    if (!loginbox.contains(event.target) &&  !loginicon.contains(event.target) && !loginlink.contains(event.target)) {
        loginbox.classList.remove("open");
    }
    if (!signinbox.contains(event.target) && !signinlink.contains(event.target)) {
        signinbox.classList.remove("open");
    }
});
