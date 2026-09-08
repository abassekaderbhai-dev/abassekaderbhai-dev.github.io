let cadre = document.getElementById('cadre');
let tux = document.getElementById('tux');
let spanScore = document.getElementById('score');
let spanScoreJ1 = document.getElementById('score-j1');
let spanTemps = document.getElementById('temps');
let titreScore = document.getElementById('titre-score');
let instruction = document.getElementById('instruction');
let commencer = document.getElementById('commencer');
let choixDuree = document.getElementById('duree');
let boutonsMode = document.querySelectorAll('[data-mode]');
let finPartie = document.getElementById('game-over');

let score = 0;
let scoreJ1 = 0;
let temps = Number(choixDuree.value);
let mode = 'ia';
let partieEnCours = false;
let intervalTemps;
let intervalIA;

changer_mode('ia');
mettre_a_jour();

choixDuree.addEventListener('change', function(){
    if (!partieEnCours){
        temps = Number(choixDuree.value);
        mettre_a_jour();
    }
});

for (let i = 0; i < boutonsMode.length; i++){
    boutonsMode[i].addEventListener('click', function(){
        if (!partieEnCours){
            changer_mode(boutonsMode[i].dataset.mode);
        }
    });
}

commencer.addEventListener('click', function(){
    if (!partieEnCours){
        demarrer_partie();
    }
});

document.addEventListener('keydown', function(event){
    if (!partieEnCours){
        return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' ||
        event.key === 'ArrowDown' || event.key === 'ArrowUp'){
        event.preventDefault();
        deplacer_tux(event.key);
    }
});

cadre.addEventListener('pointerdown', function(event){
    if (partieEnCours && mode === 'deux'){
        event.preventDefault();

        let positionCadre = cadre.getBoundingClientRect();
        let x = event.clientX - positionCadre.left - cadre.clientLeft;
        let y = event.clientY - positionCadre.top - cadre.clientTop;
        lancer_tache(x, y);
    }
});

function changer_mode(nouveauMode){
    if (mode !== nouveauMode){
        score = 0;
        scoreJ1 = 0;
        mettre_a_jour();
    }
    mode = nouveauMode;

    for (let i = 0; i < boutonsMode.length; i++){
        boutonsMode[i].classList.remove('actif');
        if (boutonsMode[i].dataset.mode === mode){
            boutonsMode[i].classList.add('actif');
        }
    }

    if (mode === 'ia'){
        titreScore.textContent = 'IA (tireur)';
        instruction.textContent = 'Déplace Tux avec les flèches et évite les taches lancées automatiquement.';
    }
    else {
        titreScore.textContent = 'Tireur (J2)';
        instruction.textContent = 'Joueur 1 déplace Tux. Joueur 2 clique dans la zone pour lancer les taches.';
    }
}

function mettre_a_jour(){
    spanScore.textContent = score;
    spanScoreJ1.textContent = scoreJ1;
    spanTemps.textContent = temps;
}

function demarrer_partie(){
    let taches = document.querySelectorAll('.tache');
    for (let i = 0; i < taches.length; i++){
        taches[i].remove();
    }

    finPartie.style.display = 'none';
    tux.style.left = '14%';
    tux.style.top = '14%';
    score = 0;
    scoreJ1 = 0;
    temps = Number(choixDuree.value);
    partieEnCours = true;
    choixDuree.disabled = true;
    commencer.style.opacity = 0.45;
    commencer.textContent = 'Partie en cours';
    mettre_a_jour();

    intervalTemps = setInterval(minuteur, 1000);
    if (mode === 'ia'){
        intervalIA = setInterval(tir_ia, 100);
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
    partieEnCours = false;
    clearInterval(intervalTemps);
    clearInterval(intervalIA);

    let adversaire = 'Le tireur';
    let nomScore = 'Tireur';
    if (mode === 'ia'){
        adversaire = "L'IA";
        nomScore = 'IA';
    }

    let resultat = 'Égalité !';
    if (scoreJ1 > score){
        resultat = 'Tux gagne !';
    }
    else if (score > scoreJ1){
        resultat = adversaire + ' gagne !';
    }

    finPartie.textContent = resultat + '\nTux : ' + scoreJ1 + ' — ' + nomScore + ' : ' + score;
    finPartie.style.display = 'grid';
    choixDuree.disabled = false;
    commencer.style.opacity = 1;
    commencer.textContent = 'Recommencer';
}

function deplacer_tux(touche){
    let x = tux.offsetLeft;
    let y = tux.offsetTop;
    let distance = cadre.clientWidth * 0.16;
    if (distance < 36){
        distance = 36;
    }

    if (touche === 'ArrowRight'){
        x += distance;
    }
    else if (touche === 'ArrowLeft'){
        x -= distance;
    }
    else if (touche === 'ArrowDown'){
        y += distance;
    }
    else if (touche === 'ArrowUp'){
        y -= distance;
    }

    if (x < 0){
        x = 0;
    }
    if (x > cadre.clientWidth - tux.offsetWidth){
        x = cadre.clientWidth - tux.offsetWidth;
    }
    if (y < 0){
        y = 0;
    }
    if (y > cadre.clientHeight - tux.offsetHeight){
        y = cadre.clientHeight - tux.offsetHeight;
    }

    tux.style.left = x + 'px';
    tux.style.top = y + 'px';
}

function tir_ia(){
    let x = tux.offsetLeft + tux.offsetWidth / 2 + Math.random() * 40 - 20;
    let y = tux.offsetTop + tux.offsetHeight / 2 + Math.random() * 40 - 20;

    if (x < 20){
        x = 20;
    }
    if (x > cadre.clientWidth - 20){
        x = cadre.clientWidth - 20;
    }
    if (y < 20){
        y = 20;
    }
    if (y > cadre.clientHeight - 20){
        y = cadre.clientHeight - 20;
    }

    lancer_tache(x, y);
}

function lancer_tache(x, y){
    if (x < 16 || y < 16 || x > cadre.clientWidth - 16 || y > cadre.clientHeight - 16){
        return;
    }

    let delaiImpact = 1000;
    if (mode === 'ia'){
        delaiImpact = 450;
    }

    let image = document.createElement('img');
    image.src = 'splat.svg';
    image.className = 'tache';
    image.style.setProperty('--duree-vol', delaiImpact + 'ms');
    image.style.left = (cadre.clientWidth / 2 - 16) + 'px';
    image.style.top = (cadre.clientHeight - 32) + 'px';

    if (mode === 'ia'){
        image.style.visibility = 'hidden';
        setTimeout(function(){
            if (partieEnCours && cadre.contains(image)){
                image.style.visibility = 'visible';
            }
        }, delaiImpact - 150);
    }

    cadre.appendChild(image);
    getComputedStyle(image).top;
    image.style.left = (x - 16) + 'px';
    image.style.top = (y - 16) + 'px';

    setTimeout(function(){
        verifier_touche(image);
    }, delaiImpact);
}

function verifier_touche(image){
    if (!partieEnCours || !cadre.contains(image)){
        return;
    }

    let positionTux = tux.getBoundingClientRect();
    let positionTache = image.getBoundingClientRect();

    if (positionTache.right >= positionTux.left &&
        positionTache.left < positionTux.right &&
        positionTache.bottom >= positionTux.top &&
        positionTache.top < positionTux.bottom){
        score += 15;
        image.src = 'splat2.svg';
        setTimeout(function(){
            image.style.zIndex = 0;
        }, 200);
    }
    else {
        scoreJ1 += 2;
        image.style.zIndex = 0;
    }

    mettre_a_jour();
    image.style.opacity = 0;
    setTimeout(function(){
        image.remove();
    }, 3000);
}
