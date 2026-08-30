DROP TABLE IF EXISTS regions, departements, communes, sites, evenements, analyses CASCADE;

CREATE TABLE regions (
	code	INTEGER PRIMARY KEY,
	nom 	VARCHAR NOT NULL
	);

CREATE TABLE departements (
	code	VARCHAR PRIMARY KEY, 
	region 	INTEGER NOT NULL REFERENCES regions(code),
	nom 	VARCHAR NOT NULL 
	);
	
CREATE TABLE communes (
	code	    VARCHAR PRIMARY KEY,
	departement VARCHAR NOT NULL REFERENCES departements(code),
	nom 	    VARCHAR NOT NULL
	);
	
CREATE TABLE sites (
	idSite 		VARCHAR PRIMARY KEY,
	nom 		VARCHAR NOT NULL, 
	codeCommune 	VARCHAR NOT NULL REFERENCES communes(code),
	dateDeclaration DATE 	NOT NULL,
	typeEau 	VARCHAR NOT NULL, 
	longitude 	DOUBLE PRECISION CHECK( longitude >= -180 AND longitude <= 180),
	latitude 	DOUBLE PRECISION CHECK( latitude >= -90 AND latitude <= 90)
	);
	
CREATE TABLE evenements (
	idEvenement	INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	idSite 		VARCHAR NOT NULL REFERENCES sites(idSite), 
	evenement 	VARCHAR NOT NULL, 
	debut 		DATE 	NOT NULL, 
	fin 		DATE 	CHECK(fin IS NULL OR debut <= fin), 
	mesure 		VARCHAR
	);
	
CREATE TABLE analyses (
	idAnalyse 	INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
	idSite 		VARCHAR NOT NULL REFERENCES sites(idSite), 
	datePrelevement DATE 	NOT NULL, 
	enterocoques 	INTEGER CHECK (enterocoques >= 0), 
	escherichia 	INTEGER CHECK (escherichia >= 0)
	);
