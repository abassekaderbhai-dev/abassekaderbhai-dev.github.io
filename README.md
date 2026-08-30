# Portfolio Abasse Kaderbhai — Fusion

Cette version fusionne les deux directions visuelles retenues :
- navigation simple en une seule page et grandes sections éditoriales ;
- détails plus techniques inspirés d'un environnement de développeur (`~/abasse`, ambre/cyan, fenêtres et métadonnées monospace).

Le contenu reste basé sur les projets déjà validés : FindMyWord, DataGuardians, Mandelbrot, Tux, calculatrice, systèmes/réseau, classification et Saison Balnéaire.

## Lancer la version complète

Prérequis : Node.js et Java.

```bash
npm start
```

Puis ouvrir : `http://localhost:4173`

La version complète est nécessaire pour lancer le vrai processus Java de FindMyWord.

## Version statique

Le contenu du dossier `public/` peut être publié sur GitHub Pages. Tout fonctionne en statique sauf le lancement du processus Java FindMyWord, qui nécessite le serveur Node fourni.

## Tux

Les visuels nécessaires au jeu sont stockés localement dans `public/assets/projects/tux/` afin de ne plus dépendre des anciens liens Moodle.
