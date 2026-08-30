CREATE TEMP TABLE t_departements (
	code_departement	TEXT,
	nom_departement 	TEXT,
	code_region 		TEXT,
	nom_region 		TEXT
	);
	
CREATE TEMP TABLE t_informations (
	saison 		TEXT,
	region 		TEXT, 
	departement 	TEXT, 
	code_site 	TEXT, 
	type_evenement 	TEXT, 
	date_debut 	TEXT, 
	date_fin 	TEXT, 
	mesures_gestion TEXT
	);
	
CREATE TEMP TABLE t_resultats (
	saison 		 TEXT,
	region		 TEXT, 
	departement	 TEXT, 
	code_site	 TEXT,
	date_prelevement TEXT,
	enterocoques	 TEXT,
	escherichia	 TEXT,
	statut		 TEXT,
	col1		 TEXT,
	col2		 TEXT,
	col3		 TEXT
	);	
	
CREATE TEMP TABLE t_sites (
	saison		   TEXT,
	region		   TEXT,
	departement	   TEXT,
	code_site	   TEXT,
	ancien_code_site   TEXT,
	evolution	   TEXT,
	nom_site	   TEXT,
	code_insee_commune TEXT,	
	nom_commune	   TEXT,
	date_declaration   TEXT,
	type_eau	   TEXT,
	longitude	   TEXT,
	latitude	   TEXT
	);
	
	
\copy t_departements FROM 'departements.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');

SET client_encoding = 'LATIN1'; --encodage utilisé pour l'import des fichiers

\copy t_informations FROM 'informations.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';');

\copy t_resultats FROM 'resultats.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';');

\copy t_sites FROM 'sites.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';');

SET client_encoding = 'UTF-8'; --remmettre l'encodage normal
