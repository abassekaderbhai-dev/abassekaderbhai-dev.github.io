--peuplement de la table regions.
INSERT INTO regions (code, nom)
SELECT DISTINCT		code_region::	INTEGER AS code, --modifie le type de l'attribut
			nom_region::	VARCHAR AS nom 
FROM t_departements;

--peuplement de la table departements.
INSERT INTO departements (code, region, nom)
SELECT		lpad(code_departement, 3, '0')::   VARCHAR AS code, --ajout de '0' à gauche
		code_region::	     		   INTEGER AS region,
		nom_departement::    		   VARCHAR AS nom 
FROM t_departements;

--peuplement de la table communes.
INSERT INTO communes (code, departement, nom)
SELECT DISTINCT		code_insee_commune::	VARCHAR AS code,
			departement::		VARCHAR, 
			nom_commune::		VARCHAR AS nom 
FROM t_sites;

--peuplement de la table sites.
INSERT INTO sites (idSite, nom, codeCommune, dateDeclaration, typeEau, longitude, latitude)
SELECT 		code_site::	       			VARCHAR AS idSite,
		nom_site::	       			VARCHAR AS nom,
		code_insee_commune::   			VARCHAR AS codeCommune,
		TO_DATE(date_declaration, 'DD/MM/YYYY')  	AS dateDeclaration, --conversion en date
		type_eau::				VARCHAR AS typeEau,
		replace(longitude, ',', '.')::		DOUBLE PRECISION, --remplace ',' par '.'
		replace(latitude, ',', '.')::		DOUBLE PRECISION 
FROM t_sites;

--peuplement de la table evenements.
INSERT INTO evenements (idSite, evenement, debut, fin, mesure)
SELECT	 	code_site::    				VARCHAR AS idSite,
		type_evenement::			VARCHAR AS evenement, 
		TO_DATE(date_debut, 'DD/MM/YYYY') 		AS debut, 
		TO_DATE(date_fin, 'DD/MM/YYYY')   		AS fin, 
		mesures_gestion::			VARCHAR AS mesure 
FROM t_informations;

--peuplement de la table analyses. 
INSERT INTO analyses (idSite, datePrelevement, enterocoques, escherichia)
SELECT	 	code_site::				  VARCHAR AS idSite,
		TO_DATE(date_prelevement, 'DD/MM/YYYY') 	  AS datePrelevement,
		enterocoques::				  INTEGER, 
		escherichia::				  INTEGER
FROM t_resultats;
