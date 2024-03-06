let menu=document.querySelector(".menuicon");
let navbar=document.querySelector(".navbar");

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
    // const isClickInsideFooter = submenu3.contains(event.target) || submenu4.contains(event.target);
    // const isClickInsideNavbar = submenu.contains(event.target) || submenu2.contains(event.target);
    const isClickInsideMenu = menu.contains(event.target) || navbar.contains(event.target);
    // if (!isClickInsideFooter){submenu4.classList.remove("open");}
    // if (!isClickInsideNavbar){submenu2.classList.remove("open");}
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

