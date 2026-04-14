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
    this.addEventListener('click', function(){
        this.style.backgroundColor = 'red';
    })
}