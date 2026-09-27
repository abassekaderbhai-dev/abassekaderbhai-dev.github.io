let barre = document.getElementById('barre-nav');
let menu = document.getElementById('menu');

barre.addEventListener('click', () => {
    if (menu.classList.contains('active')){
        menu.classList.remove('active');
    }
    else {
        menu.classList.add('active');
    }
});

let liensMenu = menu.querySelectorAll('a');

for (let i = 0; i < liensMenu.length; i++){
    liensMenu[i].addEventListener('click', () => {
        menu.classList.remove('active');
    });
}

let sections = document.querySelectorAll('main > section[id]');

let observer = new IntersectionObserver((elements) => {
    elements.forEach(element => {

        if (element.isIntersecting){

            for (let i = 0; i < liensMenu.length; i++){
                let section = liensMenu[i].getAttribute('href');

                if (section === '#' + element.target.id){
                    liensMenu[i].classList.add('active');
                }
                else {
                    liensMenu[i].classList.remove('active');
                }
            }

            let contactNav = document.getElementById('contact-nav');

            if (contactNav) {
                if (element.target.id === 'Contact'){
                    contactNav.classList.add('active');
                }
                else {
                    contactNav.classList.remove('active');
                }
            }
        }
    });
}, {rootMargin: '-35% 0px -55%'});

sections.forEach(section => observer.observe(section));
