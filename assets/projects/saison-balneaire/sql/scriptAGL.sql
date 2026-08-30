CREATE TABLE IF NOT EXISTS "regions" (
	"code" bigint NOT NULL,
	"nom" varchar(255) NOT NULL,
	PRIMARY KEY ("code")
);

CREATE TABLE IF NOT EXISTS "departements" (
	"code" varchar(3) NOT NULL,
	"region" bigint NOT NULL,
	"nom" varchar(255) NOT NULL,
	PRIMARY KEY ("code")
);

CREATE TABLE IF NOT EXISTS "communes" (
	"code" varchar(255) NOT NULL,
	"departement" varchar(3) NOT NULL,
	"nom" varchar(255) NOT NULL,
	PRIMARY KEY ("code")
);

CREATE TABLE IF NOT EXISTS "sites" (
	"idSite" varchar(255) NOT NULL,
	"nom" varchar(255) NOT NULL,
	"codeCommune" varchar(255) NOT NULL,
	"dateDeclaration" date NOT NULL,
	"typeEau" varchar(255) NOT NULL,
	"longitude" varchar(255) NOT NULL,
	"latitude" varchar(255) NOT NULL,
	PRIMARY KEY ("idSite")
);

CREATE TABLE IF NOT EXISTS "evenements" (
	"idEvenement" serial NOT NULL,
	"idSite" varchar(255) NOT NULL,
	"evenement" varchar(255) NOT NULL,
	"debut" date NOT NULL,
	"fin" date NOT NULL,
	"mesure" varchar(255) NOT NULL,
	PRIMARY KEY ("idEvenement")
);

CREATE TABLE IF NOT EXISTS "analyses" (
	"idAnalyse" serial NOT NULL,
	"idSite" varchar(255) NOT NULL,
	"datePrelevement" date NOT NULL,
	"enterocoques" bigint NOT NULL,
	"escherichia" bigint NOT NULL,
	PRIMARY KEY ("idAnalyse")
);


ALTER TABLE "departements" ADD CONSTRAINT "departements_fk1" FOREIGN KEY ("region") REFERENCES "regions"("code");
ALTER TABLE "communes" ADD CONSTRAINT "communes_fk1" FOREIGN KEY ("departement") REFERENCES "departements"("code");
ALTER TABLE "sites" ADD CONSTRAINT "sites_fk2" FOREIGN KEY ("codeCommune") REFERENCES "communes"("code");
ALTER TABLE "evenements" ADD CONSTRAINT "evenements_fk1" FOREIGN KEY ("idSite") REFERENCES "sites"("idSite");
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_fk1" FOREIGN KEY ("idSite") REFERENCES "sites"("idSite");
