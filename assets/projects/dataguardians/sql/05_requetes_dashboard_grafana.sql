-- Requêtes SQL du dashboard Grafana


-- Les valeurs comme '$carburant', '$ville' et '$jour' sont des variables Grafana.
-- Elles sont remplacées automatiquement par la valeur choisie dans le tableau de bord.
-- Exemple : si l'utilisateur choisit Gazole, Grafana remplace '$carburant' par 'Gazole'.




-- VARIABLES GRAFANA


-- Liste des carburants disponibles pour le filtre Grafana.
SELECT      nom_carburant
FROM        CARBURANT
ORDER BY    nom_carburant;


-- Liste des villes disponibles pour le filtre Grafana.
SELECT DISTINCT ville
FROM            STATION
WHERE           ville   IS NOT NULL
ORDER BY        ville;


-- Variable personnalisée Grafana pour les jours :
-- Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche, automate



-- 1. Répartition des ruptures par carburant


SELECT
    c.nom_carburant AS carburant,
    COUNT(*)        AS nombre_ruptures
FROM RUPTURE r
JOIN CARBURANT c ON c.id_carburant = r.id_carburant
GROUP BY c.nom_carburant
ORDER BY nombre_ruptures DESC;



-- 2. Stations accessibles selon le jour choisi

SELECT DISTINCT
    s.id_station,
    s.adresse,
    s.ville,
    h.jour,
    h.heure_ouverture,
    h.heure_fermeture,
    c.nom_carburant,
    rp.prix
FROM HORAIRE h
JOIN STATION s          ON s.id_station = h.id_station
JOIN RELEVES_PRIX rp    ON rp.id_station = s.id_station
JOIN CARBURANT c        ON c.id_carburant = rp.id_carburant
WHERE h.jour            = '$jour'
  AND c.nom_carburant   = '$carburant'
ORDER BY rp.prix ASC
LIMIT 100;



-- 3. Stations les plus avantageuses

WITH moyenne_carburant AS (
    SELECT
        c.nom_carburant,
        AVG(rp.prix) AS prix_moyen
    FROM RELEVES_PRIX rp
    JOIN CARBURANT c ON rp.id_carburant = c.id_carburant
    WHERE c.nom_carburant = '$carburant'
    GROUP BY c.nom_carburant
)

SELECT
    s.ville || ' - ' || s.adresse       AS station,
    ROUND((mc.prix_moyen - rp.prix), 3) AS economie_par_litre
FROM RELEVES_PRIX rp
JOIN STATION s              ON rp.id_station = s.id_station
JOIN CARBURANT c            ON rp.id_carburant = c.id_carburant
JOIN moyenne_carburant mc   ON c.nom_carburant = mc.nom_carburant
WHERE c.nom_carburant = '$carburant'
  AND rp.prix < mc.prix_moyen
ORDER BY economie_par_litre DESC
LIMIT 15;



-- 4. Stations les moins chères

SELECT
    s.id_station,
    s.adresse,
    s.ville,
    s.code_postal,
    c.nom_carburant AS carburant,
    rp.prix,
    rp.date_maj
FROM RELEVES_PRIX rp
JOIN STATION s              ON s.id_station = rp.id_station
JOIN CARBURANT c            ON c.id_carburant = rp.id_carburant
WHERE c.nom_carburant = '$carburant'
ORDER BY rp.prix ASC
LIMIT 10;



-- 5. Évolution du prix d'un carburant

SELECT
    rp.date_maj             AS time,
    ROUND(AVG(rp.prix), 3)  AS prix_moyen
FROM RELEVES_PRIX rp
JOIN CARBURANT c ON c.id_carburant = rp.id_carburant
WHERE c.nom_carburant = '$carburant'
  AND rp.date_maj IS NOT NULL
GROUP BY rp.date_maj
ORDER BY rp.date_maj;



-- 6. Stations ouvertes proposant le carburant sélectionné

SELECT
    s.latitude,
    s.longitude,
    s.ville,
    s.adresse,
    c.nom_carburant,
    rp.prix,
    h.jour,
    h.heure_ouverture,
    h.heure_fermeture
FROM STATION s
JOIN RELEVES_PRIX rp    ON s.id_station = rp.id_station
JOIN CARBURANT c        ON rp.id_carburant = c.id_carburant
JOIN HORAIRE h          ON s.id_station = h.id_station
WHERE c.nom_carburant = '$carburant'
  AND h.jour = '$jour'
  AND s.latitude    IS NOT NULL
  AND s.longitude   IS NOT NULL
  AND NOT EXISTS (
      SELECT 1
      FROM RUPTURE r
      WHERE r.id_station = s.id_station
        AND r.id_carburant = c.id_carburant
  )
ORDER BY rp.prix ASC;



-- 7. Comparaison des stations dans une ville

SELECT
    s.adresse   AS station,
    rp.prix     AS prix
FROM RELEVES_PRIX rp
JOIN STATION s      ON s.id_station = rp.id_station
JOIN CARBURANT c    ON c.id_carburant = rp.id_carburant
WHERE c.nom_carburant = '$carburant'
  AND s.ville = '$ville'
ORDER BY rp.prix ASC;



-- 8. Indicateurs clés

SELECT
    (
        SELECT  COUNT(DISTINCT rp.id_station)
        FROM    RELEVES_PRIX rp
        JOIN    CARBURANT c ON rp.id_carburant = c.id_carburant
        WHERE   c.nom_carburant = '$carburant'
    ) AS "Nombre de stations",

    (
        SELECT  ROUND(AVG(rp.prix), 3)
        FROM    RELEVES_PRIX rp
        JOIN    CARBURANT c ON rp.id_carburant = c.id_carburant
        WHERE   c.nom_carburant = '$carburant'
    ) AS "Prix moyen",

    (
        SELECT  MIN(rp.prix)
        FROM    RELEVES_PRIX rp
        JOIN    CARBURANT c ON rp.id_carburant = c.id_carburant
        WHERE   c.nom_carburant = '$carburant'
    ) AS "Prix le plus bas",

    (
        SELECT  MAX(rp.prix)
        FROM    RELEVES_PRIX rp
        JOIN    CARBURANT c ON rp.id_carburant = c.id_carburant
        WHERE   c.nom_carburant = '$carburant'
    ) AS "Prix le plus haut",

    (
        SELECT  COUNT(*)
        FROM    RUPTURE r
        JOIN    CARBURANT c ON r.id_carburant = c.id_carburant
        WHERE   c.nom_carburant = '$carburant'
    ) AS "Nombre de ruptures";




-- 9. Stations avec le plus de ruptures


SELECT
    s.id_station,
    s.adresse,
    s.ville,
    COUNT(*) AS nombre_ruptures
FROM RUPTURE r
JOIN STATION s ON s.id_station = r.id_station
GROUP BY s.id_station, s.adresse, s.ville
ORDER BY nombre_ruptures DESC
LIMIT 15;
