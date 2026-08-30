# Ensemble de Mandelbrot — Python

Un projet Python explorant la génération et la visualisation de l'ensemble de Mandelbrot, construit entièrement depuis les bases mathématiques. Les nombres complexes y sont implémentés manuellement, sans utiliser le type natif de Python, et la fractale est générée pixel par pixel.

---

## Structure du projet

```
.
├── complexes.py               # Bibliothèque complète sur les nombres complexes
├── fractale_mandelbrot.py     # Génération de l'ensemble de Mandelbrot
├── affichage.py               # Visualisation de la fractale complète
└── vallee_des_hyppocampes.py  # Zoom sur une zone précise de la fractale
```

---

## `complexes.py` — Bibliothèque des nombres complexes

Plutôt que d'utiliser le type `complex` natif de Python, les nombres complexes sont représentés manuellement sous deux formes. Toutes les opérations sont réimplémentées depuis les définitions mathématiques.

### Représentation cartésienne `[x, y]`

Un nombre complexe `z = x + iy` est représenté par une liste `[x, y]` où `x` est la partie réelle et `y` la partie imaginaire.

| Fonction | Description |
|---|---|
| `partieReelle_car(z)` | Retourne la partie réelle `x` |
| `partieImaginaire_car(z)` | Retourne la partie imaginaire `y` |
| `printZ_car(z, precision)` | Affiche le nombre sous forme lisible, ex : `0.87-0.5i` ou `i` |
| `addZ_car(z1, z2)` | Addition : `(x1+x2) + i(y1+y2)` |
| `oppZ_car(z)` | Opposé : `(-x) + i(-y)` |
| `sousZ_car(z1, z2)` | Soustraction via l'opposé |
| `multZ_car(z1, z2)` | Multiplication : `(x1x2 - y1y2) + i(x1y2 + x2y1)` |
| `invZ_car(z)` | Inverse : `x/(x²+y²) - i·y/(x²+y²)` |
| `divZ_car(z1, z2)` | Division via l'inverse |
| `module_car(z)` | Module : `√(x² + y²)` |
| `argument_car(z)` | Argument : angle dans `]-π, π]` via `atan` |

### Représentation polaire `[r, θ]`

Un nombre complexe est représenté par son module `r` et son argument `θ`, soit la forme `r·e^{iθ}`. L'argument est toujours ramené dans l'intervalle `]-π, π]`.

| Fonction | Description |
|---|---|
| `module_pol(z)` | Retourne le module `r` |
| `argument_pol(z)` | Retourne l'argument `θ` ramené dans `]-π, π]` |
| `printZ_pol(z, precision)` | Affiche sous forme `re^{iθ}` avec fractions de π lisibles, ex : `2e^{i π/3}` |
| `multZ_pol(t1, t2)` | Multiplication : `r1·r2` et `θ1+θ2` |
| `invZ_pol(t)` | Inverse : `1/r` et `-θ` |
| `divZ_pol(t1, t2)` | Division via l'inverse |
| `addZ_pol(t1, t2)` | Addition via conversion cartésienne |
| `oppZ_pol(t)` | Opposé via conversion cartésienne |
| `sousZ_pol(t1, t2)` | Soustraction via l'opposé |

### Conversion entre les deux formes

| Fonction | Formule |
|---|---|
| `conversion_car_pol(z)` | `r = √(x²+y²)`, `θ = atan(y/x)` |
| `conversion_pol_car(t)` | `x = r·cos(θ)`, `y = r·sin(θ)` |

---

## `fractale_mandelbrot.py` — Génération de l'ensemble

### Principe mathématique

L'ensemble de Mandelbrot est défini à partir de la suite suivante, pour un nombre complexe `c` fixé :

```
z₀ = 0
z_{n+1} = z_n² + c
```

Un point `c` du plan complexe **appartient à l'ensemble** si cette suite reste bornée, c'est-à-dire si son module ne dépasse jamais 2, quel que soit le nombre d'itérations. Dans le cas contraire, le point **diverge** et la vitesse à laquelle il diverge détermine sa couleur à l'affichage.

### Fonctions

**`f(z, c)`** — calcule une étape de la suite, soit `z² + c`, en utilisant les opérations définies dans `complexes.py` :

```python
def f(z, c):
    return addZ_car(multZ_car(z, z), c)
```

**`calcul_point(c, iteration)`** — applique la suite jusqu'à `iteration` fois pour un point `c`. Retourne le numéro de l'itération à laquelle le module dépasse 2 (divergence), ou `0` si le point ne diverge pas (appartient à l'ensemble). Plus ce numéro est élevé, plus le point est proche de la frontière de l'ensemble.

```python
print(calcul_point([0, 0]))     # 0   → appartient à l'ensemble
print(calcul_point([1, 1]))     # 2   → diverge très vite
print(calcul_point([0.278, 0.01]))  # 127 → proche de la frontière
```

**`Mandelbrot(xmin, xmax, ymin, ymax, precision, iteration)`** — balaye une grille de points dans la fenêtre définie, appelle `calcul_point` pour chacun et affiche le résultat avec Matplotlib. Chaque point est coloré selon sa vitesse de divergence.

| Paramètre | Description |
|---|---|
| `xmin, xmax` | Bornes horizontales de la fenêtre (axe réel) |
| `ymin, ymax` | Bornes verticales de la fenêtre (axe imaginaire) |
| `precision` | Nombre de points calculés par axe — `400` donne une grille de 160 000 points |
| `iteration` | Nombre maximum d'itérations avant de considérer un point comme borné |

---

## `affichage.py` — Visualisation de la fractale complète

Ce fichier affiche l'ensemble de Mandelbrot dans sa totalité, sur la fenêtre classique `[-2, 0.5] × [-1.2, 1.2]`. Quatre niveaux de précision sont disponibles via la liste `precision = [10, 100, 200, 400]` — il suffit de changer l'indice pour obtenir un rendu plus ou moins fin.

```python
from fractale_mandelbrot import *

iteration = 50
precision = [10, 100, 200, 400]

xmin, xmax = -2, 0.5
ymin, ymax = -1.2, 1.2

Mandelbrot(xmin, xmax, ymin, ymax, precision[2], iteration)
# precision[0] → rapide mais peu détaillé
# precision[3] → long mais très précis
```

---

## `vallee_des_hyppocampes.py` — Zoom sur la vallée des hippocampes

Ce fichier effectue un zoom sur une zone particulièrement célèbre de la fractale : la **vallée des hippocampes**, située autour du point `(-0.81125, 0.20125)`. Cette région, située à la jonction entre les deux principaux lobes de l'ensemble, révèle des structures en spirale qui rappellent la forme d'hippocampes.

```python
from fractale_mandelbrot import *

x = -0.81125
y = 0.20125
zoom = 0.01       # fenêtre de ±0.01 autour du centre

iteration = 50
precision = 400

xmin, xmax = x - zoom, x + zoom
ymin, ymax = y - zoom, y + zoom

Mandelbrot(xmin, xmax, ymin, ymax, precision, iteration)
```

Le paramètre `zoom` contrôle la taille de la fenêtre. Plus il est petit, plus on zoome. La précision est fixée à `400` pour obtenir un rendu suffisamment détaillé à ce niveau de zoom.

---

## Utilisation

```bash
# Afficher la fractale complète
python affichage.py

# Zoomer sur la vallée des hippocampes
python vallee_des_hyppocampes.py
```

---

## Prérequis

- Python 3.x
- `matplotlib` — pour la visualisation

```bash
pip install matplotlib
```
