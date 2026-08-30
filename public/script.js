let projets = {
    findmyword: {
        couleur: '#d9ff57',
        type: 'JAVA · POO · TESTS · JSON',
        titre: 'FindMyWord',
        intro: 'Le projet Java qui m’a le plus marqué cette année.',
        sujet: 'Le principe est simple : retrouver un mot en un nombre limité de tentatives. Derrière le jeu, j’ai surtout découvert une façon plus structurée d’organiser une application Java avec plusieurs classes, des interfaces et un dépôt de mots.',
        travail: [
            'Classes présentes : Game, Joueur, Tentative, Word, Affichage et Saisie.',
            'Une interface WordRepository avec deux implémentations : fixe et aléatoire.',
            'Les mots sont chargés depuis les données JSON du projet.',
            'Un fichier de tests unitaires accompagne l’application.',
            'Le jeu est prévu à l’origine pour être utilisé dans un terminal.'
        ],
        conclusion: 'Ce projet m’a surtout appris à penser à la structure du programme avant de coder.',
        images: [],
        liens: [
            ['Tester FindMyWord', 'lab:findmyword'],
            ['Rapport PDF', 'assets/projects/findmyword/rapport-findmyword.pdf'],
            ['Voir le code GitHub', 'https://github.com/abassekaderbhai-dev/FindMyWord']
        ],
        source: 'assets/projects/findmyword/src/findmyword/Game.java'
    },

    dataguardians: {
        couleur: '#73b7ff',
        type: 'POSTGRESQL · SQL · DONNÉES · GRAFANA',
        titre: 'DataGuardians',
        intro: 'Un projet de groupe autour des données de stations-service.',
        sujet: 'Le projet regroupe la création de la base, l’import de données, des requêtes d’analyse et un dashboard Grafana autour des stations-service et des prix des carburants.',
        travail: [
            'Tables principales : STATION, CARBURANT, RELEVES_PRIX, RUPTURE, HORAIRE, SERVICE et STATION_SERVICE.',
            'Création des relations, clés et contraintes dans PostgreSQL.',
            'Scripts séparés pour la création, l’import et les analyses.',
            'Plusieurs visualisations Grafana sont présentes dans les livrables.'
        ],
        conclusion: 'Ce projet qui m’a permis de travailler sur la structure d’une base PostgreSQL et de voir comment elle s’intègre dans un projet de données plus large.',
        images: [
            'assets/projects/dataguardians/grafana/09_Carte_des_stations_disponibles.png',
            'assets/projects/dataguardians/grafana/02_Evolution_du_prix_d_un_carburant.png',
            'assets/projects/dataguardians/grafana/06_Repartition_ruptures.png',
            
            'assets/projects/dataguardians/grafana/08_Stations_accessibles_selon_le-jour_choisi.png'
            
        ],
        liens: [
            ['Livrable 1', 'assets/projects/dataguardians/Livrable1_S2.04.pdf'],
            ['Livrable 2', 'assets/projects/dataguardians/Livrable2_S2.04.pdf'],
            ['Livrable 3', 'assets/projects/dataguardians/Livrable3_S2.04.pdf'],
            ['Livrable 4', 'assets/projects/dataguardians/Livrable4_S2.04.pdf']
        ],
        source: 'assets/projects/dataguardians/sql/01_creation_tables.sql'
    },

    mandelbrot: {
        couleur: '#ffb36b',
        type: 'PYTHON · ALGORITHMIQUE · NOMBRES COMPLEXES',
        titre: 'Mandelbrot',
        intro: 'Un projet Python où les maths deviennent directement visibles.',
        sujet: 'Le code implémente les opérations nécessaires sur les nombres complexes puis applique l’itération de Mandelbrot pour calculer les points de la fractale et les afficher.',
        travail: [
            'Implémentation d’opérations sur les nombres complexes.',
            'Calcul itératif d’un point de l’ensemble.',
            'Génération d’une grille de points.',
            'Affichage avec matplotlib.',
            'Exploration de la vallée des hippocampes dans un fichier dédié.'
        ],
        conclusion: 'J’ai apprécié ce projet parce qu’il mélange algorithmique et résultat visuel : on voit immédiatement l’effet du calcul dans l’image générée.',
        images: ['assets/projects/mandelbrot/ValleeDesHypocampes.png'],
        liens: [
            ['Voir le dépôt sur GitHub', 'https://github.com/abassekaderbhai-dev/Python/tree/main/Mandelbrot']
        ],
        source: 'assets/projects/mandelbrot/python/fractale_mandelbrot.py'
    },

    systems: {
        couleur: '#62d8d0',
        type: 'LINUX · SERVICES · RÉSEAU',
        titre: 'Systèmes & réseau',
        intro: 'Deux projets qui m’ont fait sortir du développement pur.',
        sujet: 'Au premier semestre, j’ai travaillé sur l’installation et la préparation d’un poste sous Linux. Au second, le travail s’est poursuivi avec la mise en place et l’observation de plusieurs services réseau.',
        travail: [
            'Kubuntu, UEFI et partitionnement.',
            'Apache, PHP, PostgreSQL, Java et Python.',
            'MariaDB, FTP et SSH.',
            'VirtualBox et Marionnet.',
            'Observation du réseau avec Wireshark.'
        ],
        conclusion: 'Ces deux projets m’ont permis de découvrir une partie de l’informatique que je connaissais beaucoup moins au début de l’année : l’environnement système et les services réseau.',
        images: [],
        liens: [
            ['Rapport installation du poste', 'assets/projects/systems/rapport-installation-poste.docx'],
            ['Rapport services réseau', 'assets/projects/systems/rapport-services-reseau.docx']
        ],
        source: null
    },

    classification: {
        couleur: '#c49cff',
        type: 'PYTHON · ALGORITHMIQUE · K-NN',
        titre: 'Classification',
        intro: 'Deux travaux qui montrent l’évolution d’une même idée.',
        sujet: "Le premier projet utilise un système de scores. Le suivant va plus loin avec une distance euclidienne puis une méthode basée sur les k plus proches voisins. Pour plus d'explication, voir le dépôt sur GitHub",
        travail: [
            'Méthode de répartition par score.',
            'Calcul de distance euclidienne.',
            'Recherche de voisins proches.',
            'Approche k-NN.',
            'Tests et comparaison des méthodes.'
        ],
        conclusion: 'C’est un bon exemple de la manière dont mes exercices d’algorithmique sont devenus progressivement plus structurés au cours de l’année.',
        images: [],
        liens: [
            ['Voir le dépôt sur GitHub', 'https://github.com/abassekaderbhai-dev/Python/tree/main/projet-repartition-Poudlard']
        ],
        source: 'assets/projects/classification/s1-02/methode_distance.py'
    },

    saison: {
        couleur: '#62d8d0',
        type: 'SQL · POSTGRESQL · MODÉLISATION',
        titre: 'Saison Balnéaire',
        intro: 'Mon premier vrai travail de modélisation relationnelle avant DataGuardians.',
        sujet: 'Le projet porte sur des données liées à la saison balnéaire. Il m’a permis de travailler la création de tables, les relations et les contraintes dans une base PostgreSQL.',
        travail: [
            'Création de tables temporaires et finales.',
            'Relations entre les données.',
            'Contraintes SQL.',
            'Scripts de création et rapport associé.'
        ],
        conclusion: 'Avec le recul, ce projet me sert surtout de point de comparaison : les notions vues ici ont ensuite été réutilisées dans un projet de données plus complet.',
        images: [],
        liens: [
            ['Rapport PDF', 'assets/projects/saison-balneaire/rapport-saison-balneaire.pdf'],
            ['Voir le dépôt sur GitHub', 'https://github.com/abassekaderbhai-dev/Bases-de-donnees/tree/main/Saison_balneaire_2024']
        ],
        source: 'assets/projects/saison-balneaire/sql/tables_finales.sql'
    }
};

let modal = document.getElementById('modal');
let contenuModal = document.getElementById('contenu-modal');
let contenuDemo = document.getElementById('contenu-demo');

function protegerTexte(texte){
    let caracteres = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    return String(texte ?? '').replace(/[&<>"']/g, caractere => caracteres[caractere]);
}

async function chargerSource(adresse, zone){
    if (!adresse){
        return;
    }

    try {
        let reponse = await fetch(adresse);

        if (!reponse.ok){
            throw Error();
        }

        zone.textContent = await reponse.text();
    }
    catch {
        zone.textContent = 'Source disponible dans les fichiers du portfolio.';
    }
}

function fermerDemo(){
    modal.classList.remove('demo-active');
    contenuDemo.innerHTML = '';

    if (window.__fmwEventSource){
        window.__fmwEventSource.close();
        window.__fmwEventSource = null;
    }
}

function ouvrirProjet(cle){
    let projet = projets[cle];

    if (!projet){
        return;
    }

    fermerDemo();

    let images = '';
    for (let i = 0; i < projet.images.length; i++){
        images += '<img src="' + projet.images[i] + '" alt="Aperçu ' + protegerTexte(projet.titre) + '" loading="lazy">';
    }

    if (images !== ''){
        images = '<div class="images-modal">' + images + '</div>';
    }

    let liens = '';
    for (let i = 0; i < projet.liens.length; i++){
        let nom = projet.liens[i][0];
        let adresse = projet.liens[i][1];

        if (adresse.startsWith('lab:')){
            let demo = adresse.split(':')[1];
            liens += '<button type="button" data-ouvrir-demo="' + demo + '">' + protegerTexte(nom) + ' ↗</button>';
        }
        else {
            let nouvelOnglet = 'target="_blank"';

            if (adresse.startsWith('http')){
                nouvelOnglet = ' target="_blank" rel="noreferrer"';
            }

            liens += '<a href="' + adresse + '"' + nouvelOnglet + '>' + protegerTexte(nom) + ' ↗</a>';
        }
    }

    let source = '';
    if (projet.source){
        let nomFichier = projet.source.split('/').pop();
        source = '<div class="code"><div class="code-entete">SOURCE · ' + protegerTexte(nomFichier) + '</div><pre data-source>Chargement…</pre></div>';
    }

    let liste = '';
    for (let i = 0; i < projet.travail.length; i++){
        liste += '<li>' + projet.travail[i] + '</li>';
    }

    let numero = Object.keys(projets).indexOf(cle) + 1;
    numero = String(numero).padStart(2, '0');

    contenuModal.innerHTML = `
        <div class="modal-entete" style="--project-accent:${projet.couleur}">
            <div class="modal-type" style="color:${projet.couleur}">${projet.type}</div>
            <div class="modal-titre">
                <div>
                    <div class="modal-numero">PROJET / ${numero}</div>
                    <h2 id="titre-modal">${projet.titre}</h2>
                </div>
            </div>
            <p class="modal-description">${projet.intro}</p>
        </div>
        <div class="modal-details">
            <div class="bloc-detail">
                <div class="titre-detail">01 / LE PROJET</div>
                <p>${projet.sujet}</p>
            </div>
            <div class="bloc-detail">
                <div class="titre-detail">02 / DANS LE PROJET</div>
                <ul class="liste-detail">${liste}</ul>
            </div>
            <div class="bloc-detail">
                <div class="titre-detail">03 / CE QUE J’EN RETIENS</div>
                <p>${projet.conclusion}</p>
            </div>
            ${images}
            ${source}
            <div class="liens-modal">${liens}</div>
        </div>
    `;

    let boutonsDemo = contenuModal.querySelectorAll('[data-ouvrir-demo]');
    for (let i = 0; i < boutonsDemo.length; i++){
        boutonsDemo[i].addEventListener('click', () => ouvrirDemo(boutonsDemo[i].dataset.ouvrirDemo));
    }

    let zoneSource = contenuModal.querySelector('[data-source]');
    if (zoneSource){
        chargerSource(projet.source, zoneSource);
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-active');
}

function fermerModal(){
    modal.classList.remove('active');
    modal.classList.remove('demo-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-active');
    contenuModal.innerHTML = '';
    contenuDemo.innerHTML = '';

    if (window.__fmwEventSource){
        window.__fmwEventSource.close();
        window.__fmwEventSource = null;
    }
}

function creerDemo(titre, type, description, contenu){
    return `
        <div class="demo-type">${type}</div>
        <h2 class="demo-titre" id="titre-modal">${titre}</h2>
        <p class="demo-description">${description}</p>
        <div class="demo-contenu">${contenu}</div>
    `;
}

function ouvrirDemo(type){
    contenuModal.innerHTML = '';
    modal.classList.add('demo-active');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-active');

    if (type === 'tux'){
        contenuDemo.innerHTML = creerDemo(
            'Jeu Tux',
            'HTML · CSS · JAVASCRIPT',
            "Choisissez un mode : contre l'IA ou à deux joueurs. Tux se déplace avec les flèches.",
            '<iframe class="tux-demo" src="assets/projects/tux/index.html" title="Jeu Tux"></iframe>'
        );
    }

    if (type === 'calculator'){
        let sourceCalculatrice = `
            <div class="source-projet-perso">
                <div class="code">
                    <div class="code-entete">SOURCE / Projet_calculatrice.py</div>
                    <pre id="source-calculatrice">Chargement...</pre>
                </div>
                <div class="liens-source">
                    <a class="boutton" href="assets/projects/calculatrice/Projet_calculatrice.py" target="_blank">Ouvrir le fichier .py ↗</a>
                    <a class="boutton" href="assets/projects/calculatrice/Projet_calculatrice.py" download>Télécharger le .py ↓</a>
                </div>
            </div>
        `;

        contenuDemo.innerHTML = creerDemo(
            'Calculatrice',
            'PYTHON / TKINTER',
            "Le projet original, réalisé en Python avec Tkinter.",
            sourceCalculatrice
        );

        chargerSource(
            'assets/projects/calculatrice/Projet_calculatrice.py',
            document.getElementById('source-calculatrice')
        );
    }

    if (type === 'hanoi'){
        let sourceHanoi = `
            <div class="source-projet-perso">
                <div class="sources-hanoi">
                    <div class="code">
                        <div class="code-entete">SOURCE / hanoi-lancer.py</div>
                        <pre id="source-hanoi-lancer">Chargement...</pre>
                    </div>
                    <div class="code">
                        <div class="code-entete">SOURCE / hanoi-dessin.py</div>
                        <pre id="source-hanoi-dessin">Chargement...</pre>
                    </div>
                </div>
                <div class="liens-source">
                    <a class="boutton" href="assets/projects/hanoi/hanoi-lancer.py" download>hanoi-lancer.py ↓</a>
                    <a class="boutton" href="assets/projects/hanoi/hanoi-dessin.py" download>hanoi-dessin.py ↓</a>
                </div>
            </div>
        `;

        contenuDemo.innerHTML = creerDemo(
            'Tours de Hanoï',
            'PYTHON / TURTLE / RÉCURSIVITÉ',
            "Le projet Python et ses fichiers d'origine.",
            sourceHanoi
        );

        chargerSource(
            'assets/projects/hanoi/hanoi-lancer.py',
            document.getElementById('source-hanoi-lancer')
        );

        chargerSource(
            'assets/projects/hanoi/hanoi-dessin.py',
            document.getElementById('source-hanoi-dessin')
        );
    }

    if (type === 'findmyword'){
        let terminal = `
            <div class="terminal-jeu">
                <div class="terminal-titre">
                    <span>findmyword / terminal</span>
                    <span>JAVA</span>
                </div>
                <div id="sortie-findmyword" class="terminal-sortie">Clique sur “Démarrer Java”.\n</div>
                <div class="terminal-commandes">
                    <input id="entree-findmyword" disabled autocomplete="off" spellcheck="false" placeholder="ta réponse…">
                    <button id="lancer-findmyword" type="button">Démarrer Java</button>
                </div>
                <div id="etat-findmyword" class="terminal-etat">Prêt.</div>
            </div>
        `;

        contenuDemo.innerHTML = creerDemo(
            'FindMyWord',
            'JAVA · POO',
            'Lancez une partie de FindMyWord directement ici.',
            terminal
        );

        lancerFindMyWord();
    }
}

function lancerFindMyWord(){
    let sortie = document.getElementById('sortie-findmyword');
    let entree = document.getElementById('entree-findmyword');
    let lancer = document.getElementById('lancer-findmyword');
    let etat = document.getElementById('etat-findmyword');
    let session = null;
    let flux = null;

    function afficher(texte){
        sortie.textContent += texte;
        sortie.scrollTop = sortie.scrollHeight;
    }

    lancer.addEventListener('click', async () => {
        sortie.textContent = '';
        etat.textContent = 'Démarrage…';

        try {
            let reponse = await fetch('/api/findmyword/start', {method: 'POST'});

            if (!reponse.ok){
                throw Error();
            }

            let resultat = await reponse.json();
            session = resultat.session;
            flux = new EventSource('/api/findmyword/stream?session=' + encodeURIComponent(session));
            window.__fmwEventSource = flux;

            flux.onmessage = event => {
                afficher(JSON.parse(event.data).data);
            };

            flux.addEventListener('exit', () => {
                etat.textContent = 'Programme terminé';
                entree.disabled = true;
                flux.close();
            });

            flux.onerror = () => {
                etat.textContent = 'Connexion interrompue';
            };

            etat.textContent = 'Programme Java actif';
            entree.disabled = false;
            entree.focus();
        }
        catch {
            afficher('Le vrai terminal Java nécessite la version complète du portfolio.\nLance : npm start\n');
            etat.textContent = 'Mode statique : Java non disponible';
        }
    });

    entree.addEventListener('keydown', async event => {
        if (event.key === 'Enter' && session){
            let valeur = entree.value;
            afficher(valeur + '\n');
            entree.value = '';

            await fetch('/api/findmyword/input', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({session: session, input: valeur})
            });
        }
    });
}

let cartesProjet = document.querySelectorAll('[data-projet]');
for (let i = 0; i < cartesProjet.length; i++){
    cartesProjet[i].addEventListener('click', () => ouvrirProjet(cartesProjet[i].dataset.projet));
}

let boutonsLab = document.querySelectorAll('[data-demo]');
for (let i = 0; i < boutonsLab.length; i++){
    boutonsLab[i].addEventListener('click', () => ouvrirDemo(boutonsLab[i].dataset.demo));
}

let boutonsFermer = document.querySelectorAll('[data-fermer]');
for (let i = 0; i < boutonsFermer.length; i++){
    boutonsFermer[i].addEventListener('click', fermerModal);
}

modal.addEventListener('click', event => {
    if (event.target === modal){
        fermerModal();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('active')){
        fermerModal();
    }
});

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
    liensMenu[i].addEventListener('click', () => menu.classList.remove('active'));
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
        }
    });
}, {rootMargin: '-35% 0px -55%'});

sections.forEach(section => observer.observe(section));
