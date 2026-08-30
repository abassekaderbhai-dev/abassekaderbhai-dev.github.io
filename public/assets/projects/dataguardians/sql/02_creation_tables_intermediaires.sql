-- Suppression des anciennes tables intermédiaires pour pouvoir relancer l'import proprement.
DROP TABLE IF EXISTS t_infos_carburants;
DROP TABLE IF EXISTS t_infos_horaires;

-- Table intermédiaire contenant le fichier principal brut.
-- Les colonnes sont en TEXT pour éviter les erreurs pendant l'import du CSV.
CREATE TABLE t_infos_carburants (
    id                                  TEXT,
    latitude                            TEXT,
    longitude                           TEXT,
    code_postal                         TEXT,
    pop                                 TEXT,
    adresse                             TEXT,
    ville                               TEXT,
    horaires                            TEXT,
    services                            TEXT,
    prix                                TEXT,
    rupture                             TEXT,
    geom                                TEXT,
    Prix_Gazole_mis_à_jour_le           TEXT,
    Prix_Gazole                         TEXT,
    Prix_SP95_mis_à_jour_le             TEXT,
    Prix_SP95                           TEXT,
    Prix_E85_mis_à_jour_le              TEXT,
    Prix_E85                            TEXT,
    Prix_GPLc_mis_à_jour_le             TEXT,
    Prix_GPLc                           TEXT,
    Prix_E10_mis_à_jour_le              TEXT,
    Prix_E10                            TEXT,
    Prix_SP98_mis_à_jour_le             TEXT,
    Prix_SP98                           TEXT,
    Début_rupture_e10_si_temporaire     TEXT,
    Type_rupture_e10                    TEXT,
    Début_rupture_sp98_si_temporaire    TEXT,
    Type_rupture_sp98                   TEXT,
    Début_rupture_sp95_si_temporaire    TEXT,
    Type_rupture_sp95                   TEXT,
    Début_rupture_e85_si_temporaire     TEXT,
    Type_rupture_e85                    TEXT,
    Début_rupture_GPLc_si_temporaire    TEXT,
    Type_rupture_GPLc                   TEXT,
    Début_rupture_gazole_si_temporaire  TEXT,
    Type_rupture_gazole                 TEXT,
    Carburants_disponibles              TEXT,
    Carburants_indisponibles            TEXT,
    Carburants_en_rupture_temporaire    TEXT,
    Carburants_en_rupture_definitive    TEXT,
    Automate_24_24_oui_non              TEXT,
    Services_proposés                   TEXT,
    Département                         TEXT,
    code_departement                    TEXT,
    Région                              TEXT,
    code_region                         TEXT,
    horaires_détaillés                  TEXT
);

-- Table intermédiaire des horaires déjà nettoyés par le script Python.
-- Elle est aussi en TEXT avant conversion vers la table finale HORAIRE.
CREATE TABLE t_infos_horaires (
    id_station      TEXT,
    jour            TEXT,
    heure_ouverture TEXT,
    heure_fermeture TEXT
);

-- Import du fichier principal dans la table intermédiaire.
-- NULL '' transforme les cases vides du CSV en valeurs NULL.
\copy t_infos_carburants FROM 'data/prix-des-carburants-en-france-flux-instantane-v2.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', NULL '');

-- Import du fichier généré par Python pour les horaires.
\copy t_infos_horaires FROM 'data/horaires_stations.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', NULL '');
