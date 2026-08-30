import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

let dossier = path.dirname(fileURLToPath(import.meta.url));
let publicDossier = path.join(dossier, 'public');
let sessions = new Map();

let types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.svg': 'image/svg+xml; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.sql': 'text/plain; charset=utf-8',
    '.java': 'text/plain; charset=utf-8',
    '.py': 'text/plain; charset=utf-8',
    '.md': 'text/plain; charset=utf-8',
    '.csv': 'text/csv; charset=utf-8',
    '.jar': 'application/java-archive',
    '.class': 'application/octet-stream',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

function envoyer(reponse, statut, contenu, type = 'text/plain; charset=utf-8'){
    reponse.writeHead(statut, {
        'content-type': type,
        'cache-control': 'no-store'
    });

    reponse.end(contenu);
}

function envoyerJson(reponse, statut, objet){
    envoyer(reponse, statut, JSON.stringify(objet), 'application/json; charset=utf-8');
}

async function lireCorps(requete){
    let contenu = '';

    for await (let partie of requete){
        contenu += partie;
    }

    return contenu;
}

function creerSessionJava(){
    let id = crypto.randomUUID();
    let base = path.join(publicDossier, 'assets/projects/findmyword');
    let classpath = [
        path.join(base, 'classes'),
        path.join(base, 'jar', 'wordset.jar')
    ].join(path.delimiter);

    let processus = spawn('java', [
        '-Dfile.encoding=UTF-8',
        '-Dstdout.encoding=UTF-8',
        '-Dstderr.encoding=UTF-8',
        '-cp',
        classpath,
        'findmyword.Main'
    ], {
        cwd: base,
        stdio: ['pipe', 'pipe', 'pipe']
    });

    let session = {
        processus: processus,
        clients: new Set(),
        historique: ''
    };

    function envoyerSortie(texte){
        session.historique += texte;

        if (session.historique.length > 25000){
            session.historique = session.historique.slice(-25000);
        }

        for (let client of session.clients){
            client.write('data: ' + JSON.stringify({data: texte}) + '\n\n');
        }
    }

    processus.stdout.setEncoding('utf8');
    processus.stderr.setEncoding('utf8');

    processus.stdout.on('data', envoyerSortie);
    processus.stderr.on('data', texte => envoyerSortie('\n[stderr] ' + texte));

    processus.on('exit', code => {
        for (let client of session.clients){
            client.write('event: exit\ndata: ' + JSON.stringify({code: code}) + '\n\n');
            client.end();
        }

        setTimeout(() => sessions.delete(id), 60000);
    });

    sessions.set(id, session);
    return id;
}

let serveur = http.createServer(async (requete, reponse) => {
    try {
        let url = new URL(requete.url, 'http://localhost');

        if (requete.method === 'POST' && url.pathname === '/api/findmyword/start'){
            let id = creerSessionJava();
            return envoyerJson(reponse, 200, {session: id});
        }

        if (requete.method === 'POST' && url.pathname === '/api/findmyword/input'){
            let contenu = await lireCorps(requete);
            let donnees = JSON.parse(contenu || '{}');
            let session = sessions.get(donnees.session);

            if (!session){
                return envoyerJson(reponse, 404, {error: 'session inconnue'});
            }

            session.processus.stdin.write(String(donnees.input ?? '') + '\n');
            return envoyerJson(reponse, 200, {ok: true});
        }

        if (requete.method === 'GET' && url.pathname === '/api/findmyword/stream'){
            let session = sessions.get(url.searchParams.get('session'));

            if (!session){
                return envoyerJson(reponse, 404, {error: 'session inconnue'});
            }

            reponse.writeHead(200, {
                'content-type': 'text/event-stream',
                'cache-control': 'no-cache',
                'connection': 'keep-alive'
            });

            reponse.write('data: ' + JSON.stringify({data: session.historique}) + '\n\n');
            session.clients.add(reponse);

            requete.on('close', () => session.clients.delete(reponse));
            return;
        }

        let fichierRelatif = decodeURIComponent(url.pathname);

        if (fichierRelatif === '/' || fichierRelatif === ''){
            fichierRelatif = '/index.html';
        }

        let fichier = path.normalize(path.join(publicDossier, fichierRelatif));

        if (!fichier.startsWith(publicDossier)){
            return envoyer(reponse, 403, 'Forbidden');
        }

        fs.stat(fichier, (erreur, informations) => {
            if (erreur || !informations.isFile()){
                return envoyer(reponse, 404, '404');
            }

            let extension = path.extname(fichier).toLowerCase();
            let type = types[extension] || 'application/octet-stream';

            reponse.writeHead(200, {'content-type': type});
            fs.createReadStream(fichier).pipe(reponse);
        });
    }
    catch (erreur){
        envoyerJson(reponse, 500, {error: erreur.message});
    }
});

let port = Number(process.env.PORT || 4173);
serveur.listen(port, () => console.log('Portfolio: http://localhost:' + port));
