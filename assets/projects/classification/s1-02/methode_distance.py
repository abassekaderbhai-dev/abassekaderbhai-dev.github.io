from math import sqrt

def create_answers_from_texte_file(fichier):
    """
    Lit un fichier texte contenant les réponses des élèves.

    Paramètre :
    - fichier (str) : nom du fichier contenant les réponses

    Retour :
    - dict : dictionnaire dont les clés sont les noms des élèves
             et les valeurs des listes de 10 entiers (leurs réponses)
    """
    f = open(fichier, 'r')
    texte = f.readline().strip()
    dico = {}

    # Lecture ligne par ligne du fichier
    while texte != "":
        # Séparation du nom et des réponses
        nom = texte.split(":")[0]
        reponses = texte.split(":")[1].split("/")
        # Conversion des réponses en entiers
        dico[nom] = [int(reponses[i]) for i in range(10)]
        texte = f.readline().strip()

    f.close()
    return dico


def Euclidean_distance(rep1, rep2):
    """
    Calcule la distance euclidienne entre deux réponses.

    Paramètres :
    - rep1 (list[int]) : première réponse (10 entiers)
    - rep2 (list[int]) : seconde réponse (10 entiers)

    Retour :
    - float : distance euclidienne entre rep1 et rep2
    """
    return sqrt(sum([(rep1[i] - rep2[i]) ** 2 for i in range(10)]))


def Euclidean_house(rep, ens_ref):
    """
    Détermine la maison associée à la réponse la plus proche.

    Paramètres :
    - rep (list[int]) : réponse de l'élève
    - ens_ref (list[dict]) : ensemble de références

    Retour :
    - str : nom de la maison du plus proche voisin
    """
    mini = ens_ref[0]
    i = 1

    # Recherche de la référence la plus proche
    while i < len(ens_ref):
        if Euclidean_distance(mini['answer'], rep) >= Euclidean_distance(ens_ref[i]['answer'], rep):
            mini = ens_ref[i]
        i += 1

    return mini['house']


def Euclidean_repartition(dico_reponse, ens_ref):
    """
    Affecte une maison à chaque élève avec la méthode euclidienne.

    Paramètres :
    - dico_reponse (dict) : dictionnaire des réponses des élèves
    - ens_ref (list[dict]) : ensemble de références

    Retour :
    - dict : dictionnaire {nom_élève : maison}
    """
    dico_repartition = {}

    for elem in dico_reponse.keys():
        dico_repartition[elem] = Euclidean_house(dico_reponse[elem], ens_ref)

    return dico_repartition


def insertion_position_NN(answer, ref, neighbors):
    """
    Détermine la position d'insertion d'une référence dans un tableau trié.

    Paramètres :
    - answer (list[int]) : réponse de l'élève
    - ref (dict) : référence à insérer
    - neighbors (list[dict]) : voisins triés du plus proche au moins proche

    Retour :
    - int : indice où insérer la référence
    """
    a = Euclidean_distance(answer, ref['answer'])
    i = 0

    # Recherche de la première référence plus éloignée
    while i < len(neighbors):
        if Euclidean_distance(answer, neighbors[i]['answer']) > a:
            return i
        i += 1

    return len(neighbors)


def insertion_NN(answer, ref, neighbors, k):
    """
    Insère une référence dans la liste des voisins en respectant la taille k.

    Paramètres :
    - answer (list[int]) : réponse de l'élève
    - ref (dict) : référence à insérer
    - neighbors (list[dict]) : voisins actuels
    - k (int) : nombre maximum de voisins

    Retour :
    - list[dict] : nouvelle liste de voisins triée
    """
    indice = insertion_position_NN(answer, ref, neighbors)
    tab = neighbors.copy()

    # Insertion de la référence au bon endroit
    tab.insert(indice, ref)

    # Suppression des voisins en trop
    while len(tab) > k:
        tab.pop()

    return tab


def NN(answer, refs, k):
    """
    Calcule les k plus proches voisins d'une réponse.

    Paramètres :
    - answer (list[int]) : réponse de l'élève
    - refs (list[dict]) : ensemble de références
    - k (int) : nombre de voisins à conserver

    Retour :
    - list[dict] : liste des k plus proches voisins
    """
    neighbors = []
    i = 0

    # Insertion progressive des références
    while i < len(refs):
        neighbors = insertion_NN(answer, refs[i], neighbors, k)
        i += 1

    return neighbors


def NN_house(neighbors):
    """
    Détermine la maison d'affectation à partir des voisins.

    Paramètre :
    - neighbors (list[dict]) : voisins triés du plus proche au moins proche

    Retour :
    - str : maison choisie
    """
    dico = {}

    # Comptage des maisons
    for elem in neighbors:
        maison = elem['house']
        if maison not in dico:
            dico[maison] = 1
        else:
            dico[maison] += 1

    # Recherche du maximum de fréquence
    maxi = max(dico.values())
    maisons_max = []

    for elem in dico.keys():
        if dico[elem] == maxi:
            maisons_max.append(elem)

    # En cas d'égalité, on prend la maison du plus proche voisin
    for elem in neighbors:
        if elem['house'] in maisons_max:
            return elem['house']


def NN_repartition(dico_rep, ens_ref, k):
    """
    Affecte une maison à chaque élève avec la méthode des k plus proches voisins.

    Paramètres :
    - dico_rep (dict) : dictionnaire des réponses des élèves
    - ens_ref (list[dict]) : ensemble de références
    - k (int) : nombre de voisins à considérer

    Retour :
    - dict : dictionnaire {nom_élève : maison}
    """
    dico_final = {}

    for elem in dico_rep.keys():
        dico_final[elem] = NN_house(NN(dico_rep[elem], ens_ref, k))

    return dico_final




