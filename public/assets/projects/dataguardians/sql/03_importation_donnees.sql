-- Suppression de la vue si elle existe déjà.
-- Cela permet de relancer le script sans erreur.
DROP VIEW IF EXISTS differents_services;

-- Insertion des stations dans la table finale.
-- Les coordonnées du fichier open data sont stockées sous forme d'entiers.
-- On les divise par 100000 pour obtenir des coordonnées GPS exploitables dans Grafana.
INSERT INTO STATION (id_station, adresse, ville, code_postal, longitude, latitude)
SELECT  id          :: INTEGER AS id_station,
        adresse     :: VARCHAR,
        ville       :: VARCHAR,
        code_postal :: VARCHAR,
        longitude   :: DOUBLE PRECISION / 100000 AS longitude,
        latitude    :: DOUBLE PRECISION / 100000 AS latitude
FROM t_infos_carburants;

-- Insertion des carburants de référence.
-- Ces identifiants seront utilisés ensuite pour relier les prix et les ruptures.
INSERT INTO CARBURANT (nom_carburant)
VALUES  ('Gazole'),
        ('SP95'),
        ('E85'),
        ('GPLc'),
        ('E10'),
        ('SP98');

-- Insertion des relevés de prix.
-- CROSS JOIN LATERAL permet de transformer les colonnes de prix en plusieurs lignes.
-- Exemple : Prix_Gazole, Prix_SP95, etc. deviennent des lignes dans RELEVES_PRIX.
INSERT INTO RELEVES_PRIX (id_station, id_carburant, prix, date_maj)
SELECT
    t.id::INTEGER,
    carburants.id_carburant,
    carburants.prix::DECIMAL,
    carburants.date_maj::DATE
FROM t_infos_carburants t
CROSS JOIN LATERAL (
    VALUES
        (1, t.Prix_Gazole,  t.Prix_Gazole_mis_à_jour_le),
        (2, t.Prix_SP95,    t.Prix_SP95_mis_à_jour_le),
        (3, t.Prix_E85,     t.Prix_E85_mis_à_jour_le),
        (4, t.Prix_GPLc,    t.Prix_GPLc_mis_à_jour_le),
        (5, t.Prix_E10,     t.Prix_E10_mis_à_jour_le),
        (6, t.Prix_SP98,    t.Prix_SP98_mis_à_jour_le)
) AS carburants(id_carburant, prix, date_maj)
WHERE carburants.prix IS NOT NULL;

-- Insertion des ruptures de carburant.
-- Le même principe est utilisé pour passer des colonnes de rupture à des lignes.
INSERT INTO RUPTURE (id_station, id_carburant, date_debut, type)
SELECT
    t.id::INTEGER,
    ruptures.id_carburant,
    ruptures.date_debut::DATE,
    ruptures.type::VARCHAR
FROM t_infos_carburants t
CROSS JOIN LATERAL (
    VALUES
        (1, t.Début_rupture_gazole_si_temporaire, t.Type_rupture_gazole),
        (2, t.Début_rupture_sp95_si_temporaire,   t.Type_rupture_sp95),
        (3, t.Début_rupture_e85_si_temporaire,    t.Type_rupture_e85),
        (4, t.Début_rupture_GPLc_si_temporaire,   t.Type_rupture_GPLc),
        (5, t.Début_rupture_e10_si_temporaire,    t.Type_rupture_e10),
        (6, t.Début_rupture_sp98_si_temporaire,   t.Type_rupture_sp98)
) AS ruptures(id_carburant, date_debut, type)
WHERE ruptures.date_debut IS NOT NULL
AND   ruptures.type IS NOT NULL;

-- Insertion des horaires nettoyés dans la table finale.
-- Les heures sont converties en type TIME.
INSERT INTO HORAIRE (id_station, jour, heure_ouverture, heure_fermeture)
SELECT  id_station       :: INTEGER,
        jour,
        heure_ouverture  :: TIME,
        heure_fermeture  :: TIME
FROM t_infos_horaires;

-- Vue crée pour éviter le même SELECT entre la table SERVICE et STATION_SERVICE.
-- Utilisée pour découper la liste des services.
-- regexp_split_to_table sépare une chaîne de texte en plusieurs lignes avec le séparateur choisi.
-- REPLACE évite que la virgule dans "(Butane, Propane)" coupe ce service en deux.
CREATE VIEW differents_services AS (
SELECT
    id :: INTEGER AS id_station,
    TRIM(
        regexp_split_to_table(
            REPLACE(
                Services_proposés,
                'Vente de gaz domestique (Butane, Propane)',
                'Vente de gaz domestique (Butane et Propane)'
            ),
            ','
        )
    ) :: VARCHAR AS nom_service
FROM t_infos_carburants
WHERE Services_proposés IS NOT NULL);

-- Insertion des services sans doublon.
INSERT INTO SERVICE (nom_service)
SELECT DISTINCT ds.nom_service
FROM differents_services ds;

-- Association entre chaque station et ses services.
-- DISTINCT évite les doublons dans la table d'association.
INSERT INTO STATION_SERVICE (id_station, id_service)
SELECT DISTINCT ds.id_station,
                s.id_service
FROM differents_services ds
JOIN SERVICE s ON s.nom_service = ds.nom_service;
