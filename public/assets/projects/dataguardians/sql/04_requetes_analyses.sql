-- Ensemble des premières requêtes pour exploiter la base de données.

-- 1. Afficher les stations et les carburants disponibles.
-- Cette requête montre quels carburants sont associés à chaque station.
SELECT DISTINCT
    s.id_station,
    s.adresse,
    s.ville,
    s.code_postal,
    c.nom_carburant
FROM STATION s
JOIN RELEVES_PRIX rp ON s.id_station = rp.id_station
JOIN CARBURANT c ON rp.id_carburant = c.id_carburant
ORDER BY s.ville, s.id_station, c.nom_carburant;

-- 2. Comparer les prix entre plusieurs stations pour un carburant donné.
-- Exemple ici avec le Gazole.
SELECT
    s.id_station,
    s.adresse,
    s.ville,
    c.nom_carburant,
    rp.prix,
    rp.date_maj
FROM STATION s
JOIN RELEVES_PRIX rp ON s.id_station = rp.id_station
JOIN CARBURANT c ON rp.id_carburant = c.id_carburant
WHERE c.nom_carburant = 'Gazole'
ORDER BY rp.prix ASC;

-- 3. Identifier les stations les moins chères pour un carburant donné.
-- LIMIT garde seulement les 10 premiers résultats.
SELECT
    s.id_station,
    s.adresse,
    s.ville,
    c.nom_carburant,
    rp.prix,
    rp.date_maj
FROM STATION s
JOIN RELEVES_PRIX rp ON s.id_station = rp.id_station
JOIN CARBURANT c ON rp.id_carburant = c.id_carburant
WHERE c.nom_carburant = 'Gazole'
ORDER BY rp.prix ASC
LIMIT 10;

-- 4. Analyser les ruptures de carburant.
-- Cette requête relie les ruptures aux stations et aux carburants concernés.
SELECT
    s.id_station,
    s.adresse,
    s.ville,
    c.nom_carburant,
    r.date_debut,
    r.type
FROM RUPTURE r
JOIN STATION s ON r.id_station = s.id_station
JOIN CARBURANT c ON r.id_carburant = c.id_carburant
ORDER BY r.date_debut DESC;

-- 5. Exploiter les horaires d'ouverture.
-- Cette requête affiche les plages horaires connues pour chaque station.
SELECT
    s.id_station,
    s.adresse,
    s.ville,
    h.jour,
    h.heure_ouverture,
    h.heure_fermeture
FROM HORAIRE h
JOIN STATION s ON h.id_station = s.id_station
ORDER BY s.ville, s.id_station, h.jour;

-- 6. Calculer des indicateurs simples.
-- AVG, MIN, MAX et COUNT donnent une première synthèse des prix par carburant.
SELECT
    c.nom_carburant,
    ROUND(AVG(rp.prix), 3) AS prix_moyen,
    MIN(rp.prix) AS prix_minimum,
    MAX(rp.prix) AS prix_maximum,
    COUNT(rp.id_prix) AS nombre_releves
FROM RELEVES_PRIX rp
JOIN CARBURANT c ON rp.id_carburant = c.id_carburant
GROUP BY c.nom_carburant
ORDER BY c.nom_carburant;

-- 7. Compter le nombre total de stations.
-- Cette requête vérifie aussi que la table STATION a bien été remplie.
SELECT
    COUNT(*) AS nombre_total_stations
FROM STATION;
