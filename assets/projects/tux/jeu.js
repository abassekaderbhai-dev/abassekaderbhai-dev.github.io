let cadre = document.getElementById('cadre');
let tux = document.getElementById('tux');
let spanMode = document.getElementById('mode');
let spanScore = document.getElementById('score');
let spanTemps = document.getElementById('temps');
let titreScore = document.getElementById('titre-score');
let instruction = document.getElementById('instruction');
let commencer = document.getElementById('commencer');
let boutonsMode = document.querySelectorAll('[data-mode]');
let boutonsDirection = document.querySelectorAll('[data-direction]');

let score = 0;
let etape = 'Début';
let temps = 10;
let mode = 'ia';
let intervalTemps;
let intervalIA;

changer_mode('ia');
mettre_a_jour();

for (let i = 0; i < boutonsMode.length; i++){
    boutonsMode[i].addEventListener('click', function(){
        if (etape !== 'Jeu'){
            changer_mode(boutonsMode[i].dataset.mode);
        }
    });
}

for (let i = 0; i < boutonsDirection.length; i++){
    boutonsDirection[i].addEventListener('click', function(){
        if (etape === 'Jeu'){
            deplacer_tux(boutonsDirection[i].dataset.direction);
        }
    });
}

commencer.addEventListener('click', function(){
    if (etape !== 'Jeu'){
        demarrer_partie();
    }
});

function changer_mode(nouveauMode){
    mode = nouveauMode;

    for (let i = 0; i < boutonsMode.length; i++){
        if (boutonsMode[i].dataset.mode === mode){
            boutonsMode[i].classList.add('actif');
        }
        else {
            boutonsMode[i].classList.remove('actif');
        }
    }

    if (mode === 'ia'){
        spanMode.textContent = "Contre l'IA";
        titreScore.textContent = 'Score IA';
        instruction.textContent = 'Déplace Tux avec les flèches et évite les taches lancées automatiquement.';
    }
    else {
        spanMode.textContent = '2 joueurs';
        titreScore.textContent = 'Score J2';
        instruction.textContent = 'Joueur 1 déplace Tux. Joueur 2 clique dans la zone pour lancer les taches.';
    }
}

function mettre_a_jour(){
    spanScore.textContent = score;
    spanTemps.textContent = temps;
}

function demarrer_partie(){
    nettoyer_taches();
    document.getElementById('game-over').style.display = 'none';

    tux.style.left = '14%';
    tux.style.top = '14%';
    score = 0;
    temps = 10;
    etape = 'Jeu';

    commencer.style.opacity = .45;
    commencer.textContent = 'Partie en cours';
    mettre_a_jour();

    clearInterval(intervalTemps);
    clearInterval(intervalIA);
    intervalTemps = setInterval(minuteur, 1000);

    if (mode === 'ia'){
        intervalIA = setInterval(tir_ia, 1250);
    }

    cadre.focus();
}

function minuteur(){
    temps -= 1;
    spanTemps.textContent = temps;

    if (temps <= 0){
        terminer_partie();
    }
}

function terminer_partie(){
    etape = 'Fin';
    clearInterval(intervalTemps);
    clearInterval(intervalIA);
    document.getElementById('game-over').style.display = 'grid';
    commencer.style.opacity = 1;
    commencer.textContent = 'Recommencer';
}

function nettoyer_taches(){
    let taches = document.querySelectorAll('.tache');

    for (let i = 0; i < taches.length; i++){
        taches[i].remove();
    }
}

function deplacer_tux(direction){
    let positionCadre = cadre.getBoundingClientRect();
    let positionTux = tux.getBoundingClientRect();
    let distance = Math.max(36, positionCadre.width * .16);
    let gauche = positionTux.left - positionCadre.left;
    let haut = positionTux.top - positionCadre.top;

    if (direction === 'droite'){
        gauche += distance;
    }

    if (direction === 'gauche'){
        gauche -= distance;
    }

    if (direction === 'bas'){
        haut += distance;
    }

    if (direction === 'haut'){
        haut -= distance;
    }

    gauche = Math.max(0, Math.min(positionCadre.width - positionTux.width, gauche));
    haut = Math.max(0, Math.min(positionCadre.height - positionTux.height, haut));

    tux.style.left = gauche + 'px';
    tux.style.top = haut + 'px';
}

document.addEventListener('keydown', function(event){
    if (etape !== 'Jeu'){
        return;
    }

    if (event.key === 'ArrowRight'){
        event.preventDefault();
        deplacer_tux('droite');
    }

    if (event.key === 'ArrowLeft'){
        event.preventDefault();
        deplacer_tux('gauche');
    }

    if (event.key === 'ArrowDown'){
        event.preventDefault();
        deplacer_tux('bas');
    }

    if (event.key === 'ArrowUp'){
        event.preventDefault();
        deplacer_tux('haut');
    }
});

cadre.addEventListener('pointerdown', function(event){
    if (etape !== 'Jeu' || mode !== 'deux'){
        return;
    }

    event.preventDefault();

    let positionCadre = cadre.getBoundingClientRect();
    let x = event.clientX - positionCadre.left;
    let y = event.clientY - positionCadre.top;

    lancer_tache(x, y);
});

function tir_ia(){
    if (etape !== 'Jeu' || mode !== 'ia'){
        return;
    }

    let positionCadre = cadre.getBoundingClientRect();
    let positionTux = tux.getBoundingClientRect();
    let xTux = positionTux.left - positionCadre.left + positionTux.width / 2;
    let yTux = positionTux.top - positionCadre.top + positionTux.height / 2;
    let erreurX = Math.random() * 120 - 60;
    let erreurY = Math.random() * 120 - 60;

    let x = Math.max(20, Math.min(positionCadre.width - 20, xTux + erreurX));
    let y = Math.max(20, Math.min(positionCadre.height - 20, yTux + erreurY));

    lancer_tache(x, y);
}

function lancer_tache(x, y){
    let positionCadre = cadre.getBoundingClientRect();

    if (x < 16 || y < 16 || x > positionCadre.width - 16 || y > positionCadre.height - 16){
        return;
    }

    let image = document.createElement('img');
    image.src = 'splat.svg';
    image.className = 'tache';
    image.style.left = (positionCadre.width / 2 - 16) + 'px';
    image.style.top = (positionCadre.height - 32) + 'px';
    cadre.appendChild(image);

    getComputedStyle(image).top;
    image.style.top = (y - 16) + 'px';
    image.style.left = (x - 16) + 'px';
    image.style.transform = 'scale(1)';

    setTimeout(function(){
        if (!image.isConnected){
            return;
        }

        let positionTux = tux.getBoundingClientRect();
        let positionImage = image.getBoundingClientRect();
        let touche = positionImage.top + positionImage.height >= positionTux.top &&
                     positionImage.top < positionTux.top + positionTux.height &&
                     positionImage.left + positionImage.width >= positionTux.left &&
                     positionImage.left < positionTux.left + positionTux.width;

        if (touche){
            image.src = 'splat2.svg';
            image.style.opacity = 0;
            score += 10;

            setTimeout(function(){
                image.remove();
            }, 3000);
        }
        else {
            image.style.zIndex = 0;
            score -= 5;
        }

        spanScore.textContent = score;
    }, 1000);
}
