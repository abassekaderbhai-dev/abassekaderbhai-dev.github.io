let linkedin = 'https://www.linkedin.com/in/abasse-kaderbhai-768a993b7';
let github = 'https://github.com/abassekaderbhai-dev';

let git = document.querySelectorAll('#tableau3 .ligne');
for (let i = 0; i<git.length; i++){
    git[i].addEventListener('click', function(){
        window.open(git[i].dataset.url, '_blank');
    })
}

let clicklink = document.getElementById('link');
clicklink.addEventListener('click', function(){
    window.open(linkedin, '_blank');
})

let clickgit = document.getElementById('gith');
clickgit.addEventListener('click', function(){
    window.open(github, '_blank');
})


let nav = document.querySelectorAll('.aligner');
for (let i = 0; i<nav.length; i++){
    nav[i].addEventListener('click', navig);
}

function navig(){
    for (let i = 0; i<nav.length; i++){
        if (nav[i] !== this){
            nav[i].style.border = 'none';
            nav[i].style.backgroundColor = 'transparent';
            nav[i].style.color = '';
        }
    }
    this.style.border = '2px solid black';
    this.style.borderRadius = '25px';
    this.style.backgroundColor = '#9acdc244';
    this.style.transition = '0.7s';
    this.style.color = '#00ffc8';
}


//------------------------Fait par IA------------------------//

const navItems = document.querySelectorAll('.aligner[data-section]');
const sections = [...navItems].map(item => {
    const id = item.dataset.section;
    return document.getElementById(id);
});

// Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;

            navItems.forEach(el => {
                el.style.border = 'none';
                el.style.backgroundColor = 'transparent';
                el.style.color = '';
            });

            const active = document.querySelector(`.aligner[data-section="${id}"]`);
            if (active) {
                active.style.transition = '0.7s';
                active.style.border = '2px solid black';
                active.style.borderRadius = '25px';
                active.style.backgroundColor = '#9acdc27d';
                active.style.color = '#00ffc8';
            }
        }
    });
}, { threshold: 0, rootMargin: "-40% 0px -40% 0px" });

// Observe chaque section
sections.forEach(sec => observer.observe(sec));


