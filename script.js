let linkedin = 'https://www.linkedin.com/in/abasse-kaderbhai-768a993b7';
let github = 'https://github.com/abassekaderbhai-dev';

let git = document.querySelectorAll('#tableau3 .ligne');
for (let i = 0; i<git.length; i++){
    git[i].addEventListener('click', () => window.open(git[i].dataset.url, '_blank'));
}

let clicklink = document.getElementById('link');
clicklink.addEventListener('click', () => window.open(linkedin, '_blank'));

let clickgit = document.getElementById('gith');
clickgit.addEventListener('click', () => window.open(github, '_blank'));


let barre = document.getElementById('barre-nav');
let menu = document.querySelector('.items');

barre.addEventListener('click', () => {
    if (menu.classList.contains('active')){
        menu.classList.remove('active');
    }
    else {
        menu.classList.add('active');
    }
});

document.querySelectorAll('.items a').forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

let nav = document.querySelectorAll('.aligner');
for (let i = 0; i<nav.length; i++){
    nav[i].addEventListener('click', function(event){
        if (event.target.nodeName !== 'A'){return;}
        navig(this);
    });
}

function navig(element){
    for (let i = 0; i<nav.length; i++){
        if (nav[i] !== element){
            nav[i].style.border = 'none';
            nav[i].style.backgroundColor = 'transparent';
            nav[i].children[0].style.color = '';
        }
    }
    element.style.border = '2px solid #00ffc8';
    element.style.borderRadius = '25px';
    element.style.backgroundColor = '#9acdc244';
    element.style.transition = '0.7s';
    element.children[0].style.color = '#00ffc8';
}

let sections = document.querySelectorAll('section');
let observer = new IntersectionObserver((secteur) => {
    secteur.forEach(sect => {
        if (sect.isIntersecting) {
            let id = sect.target.id;

            let active = document.querySelectorAll('.aligner');
            for (let activation of active){
                if (activation.dataset.section === id){
                    navig(activation);
                }
            }
        }
    });
}, { threshold: 0, rootMargin: "-40% 0px -40% 0px" });


sections.forEach(sec => observer.observe(sec));


