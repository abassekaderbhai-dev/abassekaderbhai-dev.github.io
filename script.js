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

    repartition: {
        couleur: '#c49cff',
        type: 'PYTHON · ALGORITHMIQUE · K-NN',
        titre: 'Répartition Poudlard',
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
