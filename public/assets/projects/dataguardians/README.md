# Livrable 4 — Visualisations

## Projet

SAÉ S2.04 — Exploitation d’une base de données
Analyse des stations-service et des prix des carburants à partir de données ouvertes.

## Équipe

Data Guardians
Groupe : 3 CERES

Membres :
- Abasse KADERBHAI
- ----- -------
- ------- ----------

## Contenu de l’archive

```text
doc/
    Livrable4_S2.04.pdf
data/
    prix-des-carburants-en-france-flux-instantane-v2.csv
    horaires_stations.csv

Python/
    horaires_nettoyage.py

SQL/
    01_creation_tables.sql
    02_creation_tables_intermediaires.sql
    03_importation_donnees.sql
    04_requetes_analyses.sql
    05_requetes_dashboard_grafana.sql
    
Grafana/
    export du dashboard Grafana
    captures des panels

README.md
```

## Rôle des fichiers

- `01_creation_tables.sql` : crée les tables finales de la base.
- `02_creation_tables_intermediaires.sql` : crée les tables intermediaires et importe les fichiers CSV.
- `03_importation_donnees.sql` : insère les données dans les tables finales.
- `04_requetes_analyses.sql` : contient les requêtes SQL d’analyse.
- `05_requetes_dashboard_grafana.sql` : contient les requêtes SQL utilisées par Grafana.
- `horaires_nettoyage.py` : transforme les horaires du fichier principal en fichier CSV exploitable.

## Procédure d’exécution

Les commandes suivantes sont à lancer depuis le dossier principal de l’archive.

dropdb carburants --if-exists
createdb carburants

python3 Python/horaires_nettoyage.py

psql -d carburants -f SQL/01_creation_tables.sql

psql -d carburants -f SQL/02_creation_tables_intermediaires.sql

psql -d carburants -f SQL/03_importation_donnees.sql

psql -d carburants -f SQL/04_requetes_analyses.sql
