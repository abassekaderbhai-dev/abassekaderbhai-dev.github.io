-- Suppression des anciennes tables pour pouvoir relancer le script sans conflit.
-- CASCADE supprime aussi les dépendances éventuelles entre les tables.
DROP TABLE IF EXISTS STATION, CARBURANT, RELEVES_PRIX, RUPTURE, HORAIRE, SERVICE, STATION_SERVICE CASCADE;

-- Table principale des stations-service.
-- Elle contient l'identifiant, l'adresse et les coordonnées utiles pour les analyses/cartes.
CREATE TABLE STATION (
    id_station      INTEGER PRIMARY KEY,
    adresse         VARCHAR NOT NULL,
    ville           VARCHAR,
    code_postal     VARCHAR NOT NULL,
    longitude       DOUBLE PRECISION CHECK (longitude BETWEEN -180 AND 180),
    latitude        DOUBLE PRECISION CHECK (latitude  BETWEEN -90  AND 90)
);

-- Table des types de carburants disponibles.
-- UNIQUE évite d'avoir deux fois le même carburant.
CREATE TABLE CARBURANT (
    id_carburant    SERIAL PRIMARY KEY,
    nom_carburant   VARCHAR NOT NULL UNIQUE
);

-- Table des relevés de prix.
-- Elle relie une station à un carburant avec un prix et une date de mise à jour.
CREATE TABLE RELEVES_PRIX (
    id_prix         SERIAL PRIMARY KEY,
    id_station      INTEGER NOT NULL REFERENCES STATION(id_station),
    id_carburant    INTEGER NOT NULL REFERENCES CARBURANT(id_carburant),
    prix            DECIMAL NOT NULL CHECK (prix > 0),
    date_maj        DATE
);

-- Table des ruptures de carburant.
-- Une rupture concerne une station, un carburant, une date et un type de rupture.
CREATE TABLE RUPTURE (
    id_rupture      SERIAL PRIMARY KEY,
    id_station      INTEGER NOT NULL REFERENCES STATION(id_station),
    id_carburant    INTEGER NOT NULL REFERENCES CARBURANT(id_carburant),
    date_debut      DATE NOT NULL,
    type            VARCHAR NOT NULL
);

-- Table des horaires d'ouverture des stations.
-- Une station peut avoir plusieurs lignes selon les jours et les plages horaires.
CREATE TABLE HORAIRE (
    id_horaire      SERIAL PRIMARY KEY,
    id_station      INTEGER NOT NULL REFERENCES STATION(id_station),
    jour            VARCHAR NOT NULL,
    heure_ouverture TIME NOT NULL,
    heure_fermeture TIME NOT NULL
);

-- Table des services proposés par les stations.
-- UNIQUE évite les doublons de noms de services.
CREATE TABLE SERVICE (
    id_service      SERIAL PRIMARY KEY,
    nom_service     VARCHAR NOT NULL UNIQUE
);

-- Table d'association entre les stations et les services.
-- La clé primaire composée empêche d'ajouter deux fois le même service à la même station.
CREATE TABLE STATION_SERVICE (
    id_station      INTEGER NOT NULL REFERENCES STATION(id_station),
    id_service      INTEGER NOT NULL REFERENCES SERVICE(id_service),
    PRIMARY KEY (id_station, id_service)
);
