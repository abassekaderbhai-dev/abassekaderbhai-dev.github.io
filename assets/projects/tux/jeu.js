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

let score = 0;
let scoreJ1 = 0;
let etape = 'Début';
let temps = 30;
let mode = 'ia';
let intervalTemps;
let intervalIA;

changer_mode('ia');
mettre_a_jour();

choixDuree.addEventListener('change', function(){
    if (etape !== 'Jeu'){
        temps = Number(choixDuree.value);
        mettre_a_jour();
    }
});

for (let i = 0; i < boutonsMode.length; i++){
    boutonsMode[i].addEventListener('click', function(){
        if (etape !== 'Jeu'){
            changer_mode(boutonsMode[i].dataset.mode);
        }
    });
}

commencer.addEventListener('click', function(){
    if (etape !== 'Jeu'){
        demarrer_partie();
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
        if (boutonsMode[i].dataset.mode === mode){
            boutonsMode[i].classList.add('actif');
        }
        else {
            boutonsMode[i].classList.remove('actif');
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
    nettoyer_taches();
    document.getElementById('game-over').style.display = 'none';

    tux.style.left = '14%';
    tux.style.top = '14%';
    score = 0;
    scoreJ1 = 0;
    etape = 'Jeu';
    temps = Number(choixDuree.value);
    choixDuree.disabled = true;

    commencer.style.opacity = .45;
    commencer.textContent = 'Partie en cours';
    mettre_a_jour();

    clearInterval(intervalTemps);
    clearInterval(intervalIA);
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
    etape = 'Fin';
    clearInterval(intervalTemps);
    clearInterval(intervalIA);
    document.getElementById('game-over').style.display = 'grid';
    let adversaire = mode === 'ia' ? "L'IA" : 'Le tireur';
    let resultat = scoreJ1 === score ? 'Égalité !' :
        (scoreJ1 > score ? 'Tux gagne !' : adversaire + ' gagne !');
    document.getElementById('game-over').textContent = resultat + '\nTux : ' + scoreJ1 + ' — ' +
        (mode === 'ia' ? 'IA' : 'Tireur') + ' : ' + score;
    commencer.style.opacity = 1;
    choixDuree.disabled = false;
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

    let tirIA = mode === 'ia';
    let delaiImpact = tirIA ? 450 : 1000;
    let image = document.createElement('img');
    image.src = 'splat.svg';
    image.className = 'tache';
    image.style.setProperty('--duree-vol', delaiImpact + 'ms');

    if (tirIA){
        image.style.visibility = 'hidden';
    }

    image.style.left = (positionCadre.width / 2 - 16) + 'px';
    image.style.top = (positionCadre.height - 32) + 'px';
    cadre.appendChild(image);

    if (tirIA){
        setTimeout(function(){
            if (!image.isConnected || etape !== 'Jeu'){
                return;
            }

            image.style.visibility = 'visible';
        }, delaiImpact - 150);
    }

    getComputedStyle(image).top;
    image.style.top = (y - 16) + 'px';
    image.style.left = (x - 16) + 'px';

    setTimeout(function(){
        if (!image.isConnected || etape !== 'Jeu'){
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
            score += 15;
            image.style.zIndex = 2;

            setTimeout(function(){
                image.style.zIndex = 0;
            }, 200);

            setTimeout(function(){
                image.remove();
            }, 3000);
        }
        else {
            image.style.zIndex = 0;
            scoreJ1 += 2;

            image.style.opacity = 0;

            setTimeout(function(){
                image.remove();
            }, 3000)
        }

        mettre_a_jour();
    }, delaiImpact);
}